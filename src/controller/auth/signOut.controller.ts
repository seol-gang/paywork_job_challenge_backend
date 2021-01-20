import { Request, Response } from "express";

// signOut.controller.ts
// 유저 로그아웃에 대한 처리 로직 정의
export const signOut = (req: Request, res: Response) => {
  return res
    .status(200)
    .cookie("X_AUTH", "")
    .json({ message: "Success Logout" });
};
