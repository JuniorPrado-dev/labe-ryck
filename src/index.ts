import app from "./controller/app"
import { userRouter } from "./router/apiRouter"


app.use('/user/', userRouter)
