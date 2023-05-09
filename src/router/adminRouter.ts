import express from "express";
import { AdminController } from "../controller/AdminController";

export const adminRouter = express.Router()

const adminController = new AdminController()

adminRouter.delete('/delete-table', adminController.clearTable)
adminRouter.delete('/delete-register', adminController.clearById )
// userRouter.put('/edit/:id',userController.editUser )


