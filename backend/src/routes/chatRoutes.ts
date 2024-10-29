import { NextFunction, Request, Response, Router } from "express";
import { messageValidation, validator } from "../utils/validator.js";
import { verifyToken } from "../utils/token-manager.js";
import { genaires } from "../utils/gemini.js";
import { deletechats, genearateMessage, getAllChats } from "../controllers/chatControllers.js";
const chatRouter = Router();

chatRouter.get('/all', verifyToken, getAllChats);
chatRouter.post('/new',validator(messageValidation), verifyToken, genearateMessage);
chatRouter.delete('/delete', verifyToken, deletechats)

export default chatRouter;