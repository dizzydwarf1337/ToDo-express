import pkg from "jsonwebtoken";
import ApiResponse from "../utils/apiResponse.js";

const { verify } = pkg;

export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return next(ApiResponse.Failure(401, "Access denied"));
  try {
    const decoded = verify(token, process.env.JWT_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return next(ApiResponse.Failure(403, error));
  }
};
