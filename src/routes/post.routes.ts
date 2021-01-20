import { Router } from "express";
import { createPost } from "../controller/post/createPost.controller";
import { deletePost } from "../controller/post/deletePost.controller";
import { updatePost } from "../controller/post/updatePost.controller";
import { searchPost } from "../controller/post/searchPost.controller";
import { viewPostDetail } from "../controller/post/viewPostDetail.controller";
import { typeAuthentication } from "../middleware/typeAuthentication.middleware";
import { validationDto } from "../middleware/validationDto.middleware";

// post.routes.ts
// 게시글에 대한 라우터 설정
class PostRouter {
  private router: Router = Router();

  constructor() {
    this.configure();
  }

  public getRouter(): Router {
    return this.router;
  }

  private configure(): void {
    this.router.post(
      "/",
      typeAuthentication.userAuthentication,
      validationDto.createPostValidation,
      <any>createPost
    );
    this.router.get("/search", <any>searchPost);
    this.router.get("/:postId", <any>viewPostDetail);
    this.router.put(
      "/:postId",
      typeAuthentication.userAuthentication,
      validationDto.updatePostValidation,
      typeAuthentication.postAuthentication,
      <any>updatePost
    );
    this.router.delete(
      "/:postId",
      typeAuthentication.userAuthentication,
      typeAuthentication.postAuthentication,
      <any>deletePost
    );
  }
}

export default new PostRouter().getRouter();
