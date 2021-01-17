import { Response } from "express";
import { getCustomRepository, getRepository } from "typeorm";
import { User } from "../../database/entity/user.entity";
import { UserRepository } from "../../database/repository/user.repository";
import { SignUpUser } from "../../dto/signUpUser.dto";

export const signUp = async (req: Request, res: Response) => {
  const userRepo: UserRepository = getCustomRepository(UserRepository);
  const body: SignUpUser = <SignUpUser>(<unknown>req.body);
  const user: User = new User();

  user.EMAIL = body.email;
  user.NICKNAME = body.nickname;
  user.PASSWORD = body.password;
  user.PHONE = body.phone;

  const overlapCheck = await userRepo.findByEmail(user.EMAIL);
  if (overlapCheck) {
    return res.status(409).json({ message: "User already exists" });
  }

  getRepository(User)
    .save(user)
    .then(() => res.status(201).json({ message: "Success SignUp" }))
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .json({ message: "error while signing up for member" });
    });
};
