import { body, validationResult } from "express-validator";
import { IdValidator } from "./common/idValidator.js";
import ApiResponse from "../utils/apiResponse.js";

export const CreateTaskValidator = [
  body("name").notEmpty().withMessage("Task name is required"),
  body("description").optional().isString(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(ApiResponse.Failure(400, errors.array()));
    }
    next();
  },
];

export const UpdateTaskValidator = [
  ...IdValidator,
  body("name").notEmpty().withMessage("Task name is required"),
  body("description").optional().isString(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(ApiResponse.Failure(400, errors.array()));
    }
    next();
  },
];
