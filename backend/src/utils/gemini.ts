import {GoogleGenerativeAI} from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.PORT);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
export const geminimodel = genAI.getGenerativeModel({model: "gemini-1.5-flash"});


export const genaires = async () => {
    const chat = geminimodel.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: "Hello" }],
          },
          {
            role: "model",
            parts: [{ text: "Great to meet you. What would you like to know?" }],
          },
        ],
      });
      let result = await chat.sendMessage("I have 2 dogs in my house.");
      result = await chat.sendMessage("How many paws are in my house?");
    return result;
}
