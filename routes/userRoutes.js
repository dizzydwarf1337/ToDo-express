import { Router } from "express";
import asyncHandler from "express-async-handler";
import {updateUser} from "../controllers/usersController.js";
import {UpdateUserValidator} from "../validators/userValidators.js";
const router = Router();

router.put("/update", UpdateUserValidator, asyncHandler(updateUser));

export default router;