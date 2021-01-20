import { Request, Response } from "express";
import { Post } from "../../database/entity/post.entity";
import { CreatePostDto } from "../../dto/post/createPost.dto";
import { getRepository } from "typeorm";

// createPost.controller.ts
// 게시글 등록에 대한 처리 로직 정의
export const createPost = async (req: Request, res: Response): Promise<any> => {
  const body: CreatePostDto = <CreatePostDto>(<unknown>req.body);
  const post: Post = new Post();

  // Post Entity에 값 할당
  // Object Key 값이 달라 Object.assign 사용 시 에러
  post.TITLE = body.title;
  post.CONTENT = body.content;
  post.user = (<any>req).user;

  // 게시글 등록 후 해당 글로 리다이렉트
  getRepository(Post)
    .save(post)
    .then((data) => res.redirect(`/post/${data.POST_SEQ}`))
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .json({ message: "An error occurred while posting" });
    });
};
