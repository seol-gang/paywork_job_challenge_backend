import { Request, Response } from "express";
import { getCustomRepository, getRepository } from "typeorm";
import { UserRepository } from "../../database/repository/user.repository";
import { SignInUser } from "../../dto/auth/signInUser.dto";
import * as jwt from "jsonwebtoken";

// signIn.controller.ts
// 유저 로그인에 대한 처리 로직 정의
export const signIn = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const userRepo: UserRepository = getCustomRepository(UserRepository);
  const body: SignInUser = <SignInUser>(<unknown>req.body);

  // 사용자 정보 확인
  let find: any;
  try {
    find = await userRepo.verifyLogin(body.email, body.password);
  } catch (e) {
    return res.status(500).json({ message: "An error occurred during signin" });
  }

  if (!find) {
    return res.status(401).json({ message: "No user information." });
  }

  // 사용자 인증을 위한 토큰 생성
  const token = jwt.sign(
    {
      userId: find.USER_SEQ,
    },
    process.env.JWT_SECRET
  );

  return res
    .status(200)
    .cookie("X_AUTH", token, { maxAge: 1000 * 60 * 60 })
    .json({ message: "Success singin" });
};
