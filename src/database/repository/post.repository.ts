import { EntityRepository, Repository } from "typeorm";
import { Post } from "../entity/post.entity";

// post.repository.ts
// 게시글 관련 기능 수행 시 DB 처리 부분 정의
@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  // 게시글 상세 보기 시 해당 게시글 정보 반환
  async viewPostDetail(postId: number) {
    await this.createQueryBuilder()
      .update(Post)
      .set({ HIT: () => "HIT + 1" })
      .where("post.POST_SEQ = :postId", { postId })
      .execute();
    return this.createQueryBuilder("post")
      .leftJoinAndSelect("post.user", "user")
      .select(["post", "user.USER_SEQ", "user.NICKNAME"])
      .where("post.POST_SEQ = :postId", { postId })
      .getOne();
  }

  // 게시글 수정 시 받은 데이터로 업데이트
  updatePost(postId: number, { title, content }: any) {
    return this.createQueryBuilder()
      .update(Post)
      .set({
        TITLE: title,
        CONTENT: content,
        updatedAt: new Date(),
      })
      .where("post.POST_SEQ = :postId", { postId })
      .execute();
  }

  // 게시글 삭제 시 해당 게시글 삭제
  deletePost(postId: number) {
    return this.createQueryBuilder()
      .delete()
      .from(Post)
      .where("post.POST_SEQ = :postId", { postId })
      .execute();
  }

  // 게시글 제목으로 찾을 시 해당 게시글 정보 반환
  searchPostByTitle(searchText: string) {
    return this.createQueryBuilder("post")
      .leftJoinAndSelect("post.user", "user")
      .select([
        "post.POST_SEQ",
        "post.TITLE",
        "post.HIT",
        "post.createdAt",
        "user.NICKNAME",
      ])
      .where("post.title like :text", { text: `%${searchText}%` })
      .getMany();
  }

  // 게시글 내용으로 찾을 시 해당 게시글 정보 반환
  searchPostByContent(searchText: string) {
    return this.createQueryBuilder("post")
      .leftJoinAndSelect("post.user", "user")
      .select([
        "post.POST_SEQ",
        "post.TITLE",
        "post.HIT",
        "post.createdAt",
        "user.NICKNAME",
      ])
      .where("post.content like :text", { text: `%${searchText}%` })
      .getMany();
  }

  // 작성한 유저 닉네임으로 찾을 시 해당 게시글 정보 반환
  searchPostByUser(searchText: string) {
    return this.createQueryBuilder("post")
      .leftJoinAndSelect("post.user", "user")
      .select([
        "post.POST_SEQ",
        "post.TITLE",
        "post.HIT",
        "post.createdAt",
        "user.NICKNAME",
      ])
      .where("user.nickname like :searchText", { searchText })
      .getMany();
  }
}
