import { Request, Response } from "express"
import app from "./app"
import { userRouter } from "./router/userRouter"
import { characterRouter } from "./router/characterRouter";
import { adminRouter } from "./router/adminRouter";

app.get('/',(req:Request,res:Response)=>{
    res.send('API rodando!');
})

app.use('/user/', userRouter)
app.use('/character/', characterRouter)
app.use('/admin/', adminRouter)
