import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";


export const validator = (validations : ValidationChain[]) => {
    return async (
        req : Request,
        res : Response,
        next : NextFunction
    ) => {
        for(let validation of validations){{
            const result = await validation.run(req);
            if(result.array().length) break;
        }

        }
        const errors = validationResult(req);
        // console.log(errors);
        if(!errors.isEmpty()){
            return res.status(400).json({"message" : "some error", "error": errors.array()});
        }
        // console.log("validation crossed");
        next();
    }
}


export const loginvalidaton = [
    body("email")
        .trim()
        .notEmpty().withMessage("email should not be empty")
        .isEmail().withMessage("Enter a valid email"),
    body("password")
        .trim()
        .isLength({ min : 8}).withMessage("password is atleast 8 character long")
]

export const signupValidation = [
    body("name")
            .notEmpty().withMessage("name should not be empty"),
    ...loginvalidaton
];

export const messageValidation = [
    body("message")
            .notEmpty().withMessage("message should not be empty")
]
