import { IsEmail, IsString, Length } from "class-validator";

// signUpUser.dto.ts
// 회원가입 시 필요로 하는 데이터 정의

export class SignUpUser {
  @IsEmail()
  @Length(0, 100)
  public email: string;

  @IsString()
  @Length(0, 255)
  public password: string;

  @IsString()
  @Length(0, 20)
  public nickname: string;

  @IsString()
  @Length(0, 20)
  public phone: string;
}
