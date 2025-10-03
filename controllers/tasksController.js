import { Task } from "../database/db.js";
import ApiResponse from "../utils/apiResponse.js";

export const addTask = async (req, res, next) => {
  const { name, description } = req.body;
  const task = await Task.create({ name, description, userId: req.userId });
  return next(ApiResponse.Success(200, task));
};

export const deleteTask = async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findOne({
    where: {
      id: id,
      userId: req.userId,
    },
  });

  if (!task) {
    return next(ApiResponse.Failure(404, "Task not found"));
  }

  await task.destroy();
  return next(ApiResponse.Success(200, null));
};

export const updateTask = async (req, res, next) => {
  const task = await Task.findOne({
    where: {
      id: req.params.id,
      userId: req.userId,
    },
  });
  if (!task) return next(ApiResponse.Failure(404, "Task not found"));

  await task.update(req.body);
  return next(ApiResponse.Success(200, null));
};

export const getTasks = async (req, res, next) => {
  const tasks = await Task.findAll({
    where: {
      userId: req.userId,
    },
  });
  return next(ApiResponse.Success(200, tasks));
};

export const getTask = async (req, res, next) => {
  const task = await Task.findOne({
    where: {
      id: req.params.id,
      userId: req.userId,
    },
  });
  if (task) {
    return next(ApiResponse.Success(200, task));
  } else return next(ApiResponse.Failure(404, "Task not found"));
};
