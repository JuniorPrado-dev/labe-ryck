import express from "express";

import { ApiController } from "../controller/ApiController";

export const apiRouter = express.Router()

const apiController = new ApiController()

apiRouter.post('/login', apiController.login )
apiRouter.post('/login', apiController.login )
apiRouter.put('/edit/:id',apiController.editUser )


