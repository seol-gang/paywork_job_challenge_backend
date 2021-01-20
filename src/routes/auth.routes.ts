import { Router } from "express";
import { validationDto } from "../middleware/validationDto.middleware";
import { typeAuthentication } from "../middleware/typeAuthentication.middleware";
import { signIn } from "../controller/auth/signIn.controller";
import { signUp } from "../controller/auth/signUp.controller";
import { signOut } from "../controller/auth/signOut.controller";

// auth.routes.ts
// 회원 인증에 대한 라우터 설정
class AuthRouter {
  private router: Router = Router();

  constructor() {
    this.configure();
  }

  public getRouter(): Router {
    return this.router;
  }

  private configure(): void {
    this.router.post("/signup", validationDto.signUpValidation, <any>signUp);
    this.router.post("/signin", validationDto.signInValidation, <any>signIn);
    this.router.delete(
      "/signout",
      typeAuthentication.userAuthentication,
      <any>signOut
    );
  }
}

export default new AuthRouter().getRouter();
