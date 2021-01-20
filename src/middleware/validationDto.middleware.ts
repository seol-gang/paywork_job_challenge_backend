import { validate, ValidationError, ValidatorOptions } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { SignUpUser } from "../dto/auth/signUpUser.dto";
import { SignInUser } from "../dto/auth/signInUser.dto";
import { CreatePostDto } from "../dto/post/createPost.dto";
import { UpdatePostDto } from "../dto/post/updaetPost.dto";

// validationDto.middleware.ts
// 요청 받은 데이터를 미리 정의한 DTO에 유효한지 확인하는 미들웨어

// 정의한 DTO 외 다른 key, value가 있을 때 예외 처리하는 옵션 정의
const validatorOption: ValidatorOptions = {
  forbidNonWhitelisted: true,
  whitelist: true,
};

export const validationDto = {
  // 회원가입에 대한 유효성 검사
  signUpValidation: async (req: Request, res: Response, next: NextFunction) => {
    const userDto: any = Object.assign(new SignUpUser(), req.body);
    const errors: ValidationError[] = await validate(userDto, validatorOption);
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }
    next();
  },

  // 로그인에 대한 유효성 검사
  signInValidation: async (req: Request, res: Response, next: NextFunction) => {
    const userDto: any = Object.assign(new SignInUser(), req.body);
    const errors: ValidationError[] = await validate(userDto, validatorOption);
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }
    next();
  },

  // 게시글 생성에 대한 유효성 검사
  createPostValidation: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const postDto: any = Object.assign(new CreatePostDto(), req.body);
    const errors: ValidationError[] = await validate(postDto, validatorOption);
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }
    next();
  },

  // 게시글 수정에 대한 유효성 검사
  updatePostValidation: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const postDto: any = Object.assign(new UpdatePostDto(), req.body);
    const errors: ValidationError[] = await validate(postDto, validatorOption);
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }
    next();
  },
};
