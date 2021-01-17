import { Response } from "express";

export const signOut = (req: Request, res: Response) => {
  return res
    .status(200)
    .cookie("X_AUTH", "")
    .json({ message: "Success Logout" });
};
