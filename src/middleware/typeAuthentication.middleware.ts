import * as jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { getRepository, getCustomRepository } from "typeorm";
import { PostRepository } from "../database/repository/post.repository";
import { User } from "../database/entity/user.entity";

// typeAuthentication.middleware.ts
// 게시글 및 유저에 대한 권한 확인 미들웨어

export const typeAuthentication = {
  // 본인의 게시글이 맞는지 확인하는 함수
  async postAuthentication(req: Request, res: Response, next: NextFunction) {
    const postSEQ: number = (<any>req).params.postId;
    const postRepo: PostRepository = getCustomRepository(PostRepository);

    const validPost: any = await postRepo.viewPostDetail(postSEQ);

    if (!validPost) {
      return res.status(404).json({ message: "This post does not exist" });
    }

    if (validPost.user.USER_SEQ !== (<any>req).userId) {
      return res
        .status(403)
        .json({ message: "This post do not have permission to modify" });
    }

    (<any>req).postId = postSEQ;

    next();
  },

  // 로그인 상태인지 확인하는 함수
  async userAuthentication(req: Request, res: Response, next: NextFunction) {
    const token = (<any>req).cookies.X_AUTH;

    jwt.verify(token, process.env.JWT_SECRET, async (err: any, data: any) => {
      if (err) {
        return res.status(401).json({ message: "Authorization required" });
      }
      (<any>req).userId = data.userId;
      try {
        (<any>req).user = await getRepository(User).findOne({
          USER_SEQ: data.userId,
        });
      } catch (e) {
        return res.status(401).json({ message: "User is invalid" });
      }

      next();
    });
  },
};
