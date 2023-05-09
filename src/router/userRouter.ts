import express from "express";

import { UserController } from "../controller/UserController";

export const userRouter = express.Router()

const userController = new UserController()

userRouter.post('/singup', userController.singUp)
userRouter.post('/login', userController.login )
userRouter.get('/get-user', userController.getUser )
// userRouter.put('/edit/:id',userController.editUser )


