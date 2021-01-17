import { Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../../database/repository/user.repository";
import { SignInUser } from "../../dto/signInUser.dto";
import * as jwt from "jsonwebtoken";

export const signIn = async (req: Request, res: Response) => {
  const userRepo: UserRepository = getCustomRepository(UserRepository);
  const body: SignInUser = <SignInUser>(<unknown>req.body);

  const find = await userRepo.verifyLogin(body.email, body.password);
  if (!find) {
    return res.status(401).json({ message: "No user information." });
  }
  const token = jwt.sign(
    {
      userId: find.USER_SEQ,
    },
    process.env.JWT_SECRET
  );

  return res
    .status(200)
    .cookie("X_AUTH", token, { maxAge: 1000 * 60 * 60 })
    .json({ code: 200, message: "Success Login" });
};
