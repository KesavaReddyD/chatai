import { NextFunction, Request, Response } from "express";
import { geminimodel } from "../utils/gemini.js";
import User from "../models/user.js";


export const getAllChats = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = await User.findById(res.locals.jwtData.id);
    if(!user) return res.status(404).json({message: "user not found"});
    return res.status(200).json({chats: user.chats});
}


export const genearateMessage = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const message = req.body.message;

    const user = await User.findById(res.locals.jwtData.id);
    if(!user){
        res.status(404).json({message: "user not found"});
    }
    const chathistory = user.chats.map(({role, content}) => {
        return {role, parts: [{ text: content }]}
    });

    const modelChat = geminimodel.startChat({
        history: chathistory
    });

    const modelResponse = await modelChat.sendMessage(message);
    user.chats.push({role: "user", content: message});
    const {parts, role} = modelResponse.response.candidates[0].content;
    user.chats.push({role, content: parts[0].text})
    user.save();

    res.status(200).json({response: parts[0].text , role});

    // console.log(chathistory);

    
}


export const deletechats = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = await User.findByIdAndUpdate(res.locals.jwtData.id, {$set: {chats : []}}, {new : true});
    if(!user) return res.status(404).json({message: "user not found"});
    res.status(200).json({message: "user deleted successfully", user});
}