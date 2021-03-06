import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { PostRepository } from "../../database/repository/post.repository";

// updatePost.controller.ts
// 게시글 검색에 대한 처리 로직 정의
export const searchPost = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  // 쿼리 파라미터 데이터 저장
  const searchType: number = +(<any>req).query.type;
  const searchText: string = decodeURI((<any>req).query.text);

  const postRepo: PostRepository = getCustomRepository(PostRepository);

  let searchData: any;
  try {
    // 쿼리 파라미터가 존재 하지 않을 경우 전체 게시글 반환
    if (!searchType && searchText === "undefined") {
      searchData = await postRepo.searchAllPosts();
    } else if (searchType === 0) {
      searchData = await postRepo.searchPostByTitle(searchText);
    } else if (searchType === 1) {
      searchData = await postRepo.searchPostByContent(searchText);
    } else if (searchType === 2) {
      searchData = await postRepo.searchPostByUser(searchText);
    } else {
      return res
        .status(400)
        .json({ message: "Requested the wrong information." });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "An error occurred while searching the post" });
  }

  return res.status(200).json({ data: searchData });
};
