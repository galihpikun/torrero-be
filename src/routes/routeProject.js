import express from "express"
import { createProject, deleteProject, editProject, getProjectById, getProjects } from "../controllers/projectController.js";

const routeProject = express.Router();

routeProject.get('/get-all/', getProjects)
routeProject.get('/:projectId', getProjectById)
routeProject.post('/', createProject)
routeProject.put('/:projectId', editProject)
routeProject.delete('/:projectId', deleteProject)

export default routeProject;