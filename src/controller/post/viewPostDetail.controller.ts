import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { PostRepository } from "../../database/repository/post.repository";

// viewPostDetail.controller.ts
// 게시글 상세보기에 대한 처리 로직 정의
export const viewPostDetail = async (req: Request, res: Response) => {
  const postSEQ: number = (<any>req).params.postId;
  const postRepo: PostRepository = getCustomRepository(PostRepository);

  let postData: any;
  try {
    postData = await postRepo.viewPostDetail(postSEQ);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "An error occurred while retrieving the post" });
  }

  if (!postData) {
    return res.status(404).json({ message: "This post does not exist" });
  }

  return res.status(200).json({ data: postData });
};
