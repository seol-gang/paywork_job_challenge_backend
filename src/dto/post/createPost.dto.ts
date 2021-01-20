import { IsString, Length, IsNotEmpty } from "class-validator";

// createPost.dto.ts
// 게시글 생성 시 필요로 하는 데이터 정의

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @Length(0, 255)
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
