import { body, validationResult } from "express-validator";
import ApiResponse from "../utils/apiResponse.js";

export const RegisterUserValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("password").isStrongPassword().withMessage("Password is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(ApiResponse.Failure(400, errors.array()));
    }
    next();
  },
];

export const LoginUserValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("password").notEmpty().withMessage("Password is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(ApiResponse.Failure(400, errors.array()));
    }
    next();
  },
];
