import { Router } from "express";
const router = Router();
import asyncHandler from "express-async-handler";

import {
  CreateTaskValidator,
  UpdateTaskValidator,
} from "../validators/taskValidators.js";
import { IdValidator } from "../validators/common/idValidator.js";

import {
  addTask,
  getTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/tasksController.js";

router.get("/", asyncHandler(getTasks));

router.post("/addTask", CreateTaskValidator, asyncHandler(addTask));

router.get("/:id", IdValidator, asyncHandler(getTask));

router.put("/:id", UpdateTaskValidator, asyncHandler(updateTask));

router.delete("/:id", IdValidator, asyncHandler(deleteTask));

export default router;
