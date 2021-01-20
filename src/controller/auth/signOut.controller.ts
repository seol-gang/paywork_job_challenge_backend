import { Request, Response } from "express";

// signOut.controller.ts
// 유저 로그아웃에 대한 처리 로직 정의
export const signOut = (
  req: Request,
  res: Response
): Response<any, Record<string, any>> => {
  // 사용자 토큰을 쿠키에서 지워 로그아웃 처리
  return res
    .status(200)
    .cookie("X_AUTH", "")
    .json({ message: "Success Logout" });
};
