import { IsEmail, IsString, Length } from "class-validator";

// signInUser.dto.ts
// 로그인 시 필요로 하는 데이터 정의

export class SignInUser {
  @IsEmail()
  @Length(0, 100)
  public email: string;

  @IsString()
  @Length(0, 255)
  public password: string;
}
