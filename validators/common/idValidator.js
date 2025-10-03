import { param, validationResult } from "express-validator";

import ApiResponse from "../../utils/apiResponse.js";

export const IdValidator = [
  param("id").isUUID().withMessage("Invalid id type"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(ApiResponse.Failure(400, errors.array()));
    }
    next();
  },
];
