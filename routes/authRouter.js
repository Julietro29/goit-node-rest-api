import express from "express";
import { register, login } from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import * as schema from "../schemas/userSchemas.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(schema.registerSchema), register);
authRouter.post("/login", validateBody(schema.loginSchema), login);

export default authRouter;
