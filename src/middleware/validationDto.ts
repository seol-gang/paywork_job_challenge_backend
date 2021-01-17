import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { SignUpUser } from "../dto/signUpUser.dto";
import { SignInUser } from "../dto/signInUser.dto";

export const validationDto = {
  signUpValidation: async (req: Request, res: Response, next: NextFunction) => {
    const userDto: SignUpUser = new SignUpUser();

    userDto.email = req.body.email;
    userDto.password = req.body.password;
    userDto.nickname = req.body.nickname;
    userDto.phone = req.body.phone;

    const errors: ValidationError[] = await validate(userDto);
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }
    next();
  },
  signInValidation: async (req: Request, res: Response, next: NextFunction) => {
    const userDto: SignInUser = new SignInUser();

    userDto.email = req.body.email;
    userDto.password = req.body.password;

    const errors: ValidationError[] = await validate(userDto);
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }
    next();
  },
};
