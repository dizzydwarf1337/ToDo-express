import { body, validationResult } from "express-validator";
import ApiResponse from "../utils/apiResponse.js";

export const UpdateUserValidator = [
    body("name").notEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            next(ApiResponse.Failure(400, errors.array()));
        }
        next();
    }
]