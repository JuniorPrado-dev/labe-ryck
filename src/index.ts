import { Request, Response } from "express"
import app from "./app"
import { userRouter } from "./router/userRouter"
import { characterRouter } from "./router/characterRouter";

app.get('/',(req:Request,res:Response)=>{
    res.send('API rodando!');
})

app.use('/user/', userRouter)
app.use('/character/', characterRouter)
