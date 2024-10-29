import { Router } from "express";
import userRouter from "./userRoutes.js";
import chatRouter from "./chatRoutes.js";
const appRouter = Router();



appRouter.use('/users', userRouter);
appRouter.use('/chat', chatRouter);
    

export default appRouter;