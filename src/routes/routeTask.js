import express from "express";

import { createTask, deleteTask, editTask, getTaskById, getTasks } from "../controllers/taskController.js";

const routeTask = express.Router();

routeTask.get("/get-all/:projectId", getTasks);
routeTask.get("/:taskId", getTaskById);
routeTask.post("/", createTask);
routeTask.put("/:taskId", editTask);
routeTask.delete("/:taskId", deleteTask);

export default routeTask;
