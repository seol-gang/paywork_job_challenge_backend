import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { PostRepository } from "../../database/repository/post.repository";

// updatePost.controller.ts
// 게시글 수정에 대한 처리 로직 정의
export const updatePost = async (req: Request, res: Response): Promise<any> => {
  const postRepo: PostRepository = getCustomRepository(PostRepository);

  // 게시글의 고유 id와 넘겨진 body 데이터로 게시글 수정
  postRepo
    .updatePost((<any>req).postId, (<any>req).body)
    .then(() => res.status(200).json({ message: "Successfully modified post" }))
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .json({ message: "An error occurred while updating the post." });
    });
};
