import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const userAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = (<any>req).cookies.X_AUTH;

  jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    if (err) {
      return res.status(401).json({ message: "Authorization required" });
    }
    (<any>req).userId = data.userId;

    next();
  });
};
