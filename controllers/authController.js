import { User } from "../database/db.js";
import ApiResponse from "../utils/apiResponse.js";
import { hash, compare } from "bcrypt";
import pkg from "jsonwebtoken";

const { sign } = pkg;

export const register = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      name: req.body.name,
    },
  });
  if (user) return next(ApiResponse.Failure(400, "User already exists"));
  const { name, password } = req.body;
  const hashedPassword = await hash(password, 10);

  await User.create({ name, password: hashedPassword });
  return next(ApiResponse.Success(200, "User Created successfully"));
};

export const login = async (req, res, next) => {
  const { name, password } = req.body;
  const user = await User.findOne({
    where: { name: name },
  });
  if (!user) {
    return next(ApiResponse.Failure(400, "Invalid username or password"));
  }
  const passwordMatch = await compare(password, user.password);
  if (!passwordMatch) {
    return next(ApiResponse.Failure(400, "Invalid username or password"));
  }
  const token = sign({ userId: user.id }, process.env.JWT_KEY, {
    expiresIn: "1h",
  });
  return next(ApiResponse.Success(200, token));
};
