import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../../database/entity/user.entity";
import { SignUpUser } from "../../dto/auth/signUpUser.dto";

export const signUp = async (req: Request, res: Response) => {
  const body: SignUpUser = <SignUpUser>(<unknown>req.body);
  const user: User = new User();

  user.EMAIL = body.email;
  user.NICKNAME = body.nickname;
  user.PASSWORD = body.password;
  user.PHONE = body.phone;

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
