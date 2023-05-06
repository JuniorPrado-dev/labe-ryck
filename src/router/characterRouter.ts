import express from "express";
import { CharacterController } from "../controller/CharacterController";

export const characterRouter = express.Router()

const characterController = new CharacterController()

characterRouter.post('/create', characterController.createCharacter)
characterRouter.get('/all-characters', characterController.getAllCharacter)
// characterRouter.post('/login', characterController.login )
// characterRouter.put('/edit/:id',userController.editUser )


