import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../../database/entity/user.entity";
import { SignUpUser } from "../../dto/auth/signUpUser.dto";

// signUp.controller.ts
// 유저 회원가입에 대한 처리 로직 정의
export const signUp = async (req: Request, res: Response): Promise<any> => {
  const body: SignUpUser = <SignUpUser>(<unknown>req.body);
  const user: User = new User();

  // User Entity에 값 할당
  // Object Key 값이 달라 Object.assign 사용 시 에러
  user.EMAIL = body.email;
  user.NICKNAME = body.nickname;
  user.PASSWORD = body.password;
  user.PHONE = body.phone;

  // TypeORM을 통한 유저 데이터 저장
  getRepository(User)
    .save(user)
    .then(() => res.status(201).json({ message: "Success SignUp" }))
    .catch((err) => {
      console.log(err);
      if (err.errno === 1062) {
        return res.status(409).json({ message: "User already exists" });
      }
      return res
        .status(500)
        .json({ message: "error while signing up for member" });
    });
};
