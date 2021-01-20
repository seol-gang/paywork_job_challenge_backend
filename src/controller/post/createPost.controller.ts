import { Request, Response } from "express";
import { Post } from "../../database/entity/post.entity";
import { CreatePostDto } from "../../dto/post/createPost.dto";
import { getRepository } from "typeorm";

// createPost.controller.ts
// 게시글 등록에 대한 처리 로직 정의
export const createPost = async (req: Request, res: Response) => {
  const body: CreatePostDto = <CreatePostDto>(<unknown>req.body);
  const board: Post = new Post();

  board.TITLE = body.title;
  board.CONTENT = body.content;
  board.user = (<any>req).user;

  getRepository(Post)
    .save(board)
    .then((data) => res.redirect(`/post/${data.POST_SEQ}`))
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .json({ message: "An error occurred while posting" });
    });
};
