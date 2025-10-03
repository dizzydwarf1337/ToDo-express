import { Router } from "express";
const router = Router();
import asyncHandler from "express-async-handler";
import { register, login } from "../controllers/authController.js";
import {
  RegisterUserValidator,
  LoginUserValidator,
} from "../validators/authValidators.js";

router.post("/register", RegisterUserValidator, asyncHandler(register));

router.post("/login", LoginUserValidator, asyncHandler(login));

export default router;
