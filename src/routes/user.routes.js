import { Router } from "express";
import userController from "../controller/UserController.js";

const userRouter = Router();

userRouter.get("/", userController.findAllUsers);
userRouter.get("/:id", userController.findUser);
userRouter.post("/", userController.createUser);
userRouter.put("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);
