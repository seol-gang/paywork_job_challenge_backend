import { IsEmail, Length } from "class-validator";

export class SignUpUser {
  @IsEmail()
  @Length(0, 100)
  public email: string;

  @Length(0, 255)
  public password: string;

  @Length(0, 20)
  public nickname: string;

  @Length(0, 20)
  public phone: string;
}
