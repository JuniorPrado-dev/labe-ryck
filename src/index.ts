import { Request, Response } from "express"
import app from "./app"
import { userRouter } from "./router/userRouter"

app.get('/',(req:Request,res:Response)=>{
    res.send('API rodando!');
})
app.use('/user/', userRouter)
