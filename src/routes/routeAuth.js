import express from "express";
import { getUsers, getUsersById, login, logout, register } from "../controllers/authController.js";

const routeAuth = express.Router();

routeAuth.get('/get-all', getUsers);
routeAuth.get('/:userId', getUsersById);
routeAuth.post('/register', register);
routeAuth.post('/login', login);
routeAuth.post('/logout', logout)

export default routeAuth;