import { Router } from "express";
import { validationDto } from "../middleware/validationDto";
import { userAuthentication } from "../middleware/userAuthentication";
import { signIn } from "../controllers/users/signIn.controller";
import { signUp } from "../controllers/users/signUp.controller";
import { signOut } from "../controllers/users/signOut.controller";

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
    this.router.delete("/signout", <any>userAuthentication, <any>signOut);
  }
}

export default new AuthRouter().getRouter();
