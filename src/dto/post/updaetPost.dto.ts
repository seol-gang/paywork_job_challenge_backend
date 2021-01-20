import { CreatePostDto } from "./createPost.dto";

// updatePost.dto.ts
// 게시글 수정 시 필요로 하는 데이터 정의

// 게시글 생성 시 필요하는 데이터와 같으므로 CreatePostDto를 상속받아 사용
export class UpdatePostDto extends CreatePostDto {}
