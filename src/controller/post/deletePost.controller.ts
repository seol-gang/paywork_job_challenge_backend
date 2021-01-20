import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { PostRepository } from "../../database/repository/post.repository";

// deletePost.controller.ts
// 게시글 삭제에 대한 처리 로직 정의
export const deletePost = async (req: Request, res: Response): Promise<any> => {
  const postRepo: PostRepository = getCustomRepository(PostRepository);

  // 게시글 고유 ID로 게시글을 찾아 데이터 삭제
  postRepo
    .deletePost((<any>req).postId)
    .then(() => res.status(200).json({ message: "Successfully deleted post" }))
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .json({ message: "An error occurred while deleting the post." });
    });
};
