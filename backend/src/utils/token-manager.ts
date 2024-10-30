import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";

export const createToken = (id: string, email: string, expiresIn: string) => {
    const payload = {id, email};
    const token = jwt.sign(payload, process.env.JWT_SECRET,{
        expiresIn: expiresIn
    });
    return token;
}

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(COOKIE_NAME);
    const token = req.signedCookies[`${COOKIE_NAME}`];
    console.error(token);
    if(!token || token.trim() === ''){
        return res.status(401).json({ message: "Token Not Received"});
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
        if(err){
            return res.status(401).json({ message: "Token Expired" });
        }else{
            res.locals.jwtData = success;
            console.log("token verified");
            return next();
        }
    });
}