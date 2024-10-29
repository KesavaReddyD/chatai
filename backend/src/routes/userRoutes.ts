import { Router } from "express";
import { getAllUsers, logIn, logout, signUp, verifyUser } from "../controllers/usersControllers.js";
import { loginvalidaton, signupValidation, validator } from "../utils/validator.js";
import { verifyToken } from "../utils/token-manager.js";
const userRouter = Router();

userRouter.get('/all', getAllUsers);

userRouter.post('/signup', validator(signupValidation) ,signUp);
userRouter.post('/login',validator(loginvalidaton), logIn);
userRouter.get('/authverify', verifyToken, verifyUser);
userRouter.get('/logout', logout);

export default userRouter;