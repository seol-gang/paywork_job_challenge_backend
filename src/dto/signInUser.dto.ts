import { IsEmail, Length } from "class-validator";

export class SignInUser {
  @IsEmail()
  @Length(0, 100)
  public email: string;

  @Length(0, 255)
  public password: string;
}
