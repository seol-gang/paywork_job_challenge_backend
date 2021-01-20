# paywork_job_challenge

본 프로젝트는 페이워크 코딩 스타일 FIT 체크업을 확인하기 위한 과제입니다.

---

## 0. 실행

> 1. 데이터 베이스 생성
> 2. `.env.exmple` 파일 명을 `.env` 로 변경 후 파일 안의 환경변수 작성 후 저장
> 3. `npm install`
> 4. `npm run build-start <or> ts-node-start`  
>    *만약 build-start로 할 시 ormconfig.js 파일의 enetities 설정 부분에서 **.ts 를 **.js로 변경  
>    *최초 실행 시 ts-node-start로 실행 (엔티티에 정의된 테이블 생성 필요)
> 5. 약간의 테스트 데이터가 필요 하다면 paywowrk_test.sql 를 실행시켜 적용  
>    `mysql -u <username> -p < paywork_test.sql`

---

## 1. 기능

### 인증

- 로그인
- 회원가입
- 회원가입

### 게시글

- 게시글 생성
- 게시글 삭제
- 게시글 수정
- 게시글 검색
- 게시글 상세보기

---

## 2. 폴더 구조

```
.
├ src
│  ├ controller
│  │     ├ auth
│  │     │  ├ signIn.controller.ts   로그인 컨트롤러
│  │     │  ├ signOut.controller.ts  로그아웃 컨트롤러
│  │     │  └ signUp.controller.ts   회원가입 컨트롤러
│  │     │
│  │     └ post
│  │         ├ createPost.controller.ts       게시글 생성 컨트롤러
│  │         ├ deletePost.controller.ts       게시글 삭제 컨트롤러
│  │         ├ searchPost.controller.ts       게시글 검색 컨트롤러
│  │         ├ updatePost.controller.ts       게시글 수정 컨트롤러
│  │         └ viewPostDetail.controller.ts   게시글 상세보기 컨트롤러
│  │
│  ├ database
│  │     ├ entity
│  │     │  ├ post.entity.ts  TypeORM post 테이블 정의
│  │     │  └ user.entity.ts  TypeORM user 테이블 정의
│  │     └ repository
│  │         ├ post.repository.ts  게시글 관련 쿼리 기능 정의
│  │         └ user.repository.ts  유저 관련 쿼리 기능 정의
│  │
│  ├── dto
│  │     ├ auth
│  │     │  ├ signInUser.dto.ts   로그인 시 유효성 검사를 위한 데이터 정의
│  │     │  └ signUpUser.dto.ts   회원가입 시 유효성 검사를 위한 데이터 정의
│  │     └ post
│  │         ├ createPost.dto.ts   게시글 생성 시 유효성 검사를 위한 데이터 정의
│  │         └ updatePost.dto.ts   게시글 수정 시 유효성 검사를 위한 데이터 정의
│  │
│  ├ middleware
│  │  ├ typeAuthentication.middleware.ts  게시글, 유저 유효성 확인 미들웨어
│  │  └ validationDto.middleware.ts  정의한 DTO 바탕으로 데이터 유효성 확인 미들웨어
│  │
│  ├ routes
│  │  ├ auth.routes.ts  auth 컨트롤러 라우터
│  │  └ post.routes.ts  post 컨트롤러 라우터
│  │
│  ├ util
│  │  └ dataEncrypt.ts  데이터 암호화 기능 정의
│  │
│  ├ app.ts    서버 셋팅 클래스 정의
│  └ server.ts 메인 서버 파일
│
├ .env.example       서버 실행 시 필요한 환경변수 정의
├ .gitignore         Git 제외 목록 정의
├ ormconfig.js       TypeORM 설정 파일
├ package-lock.json  node_modules 의존성 트리 정의
├ package.json       프로젝트 및 사용한 모듈 정의
├ paywork_test.sql   테스트 DB 데이터 쿼리문 정의
├ README.md          프로젝트 설명 마크다운
└ tsconfig.json      Typescript 컴파일 설정 파일
```

---

## 3. APIs, DB 문서

> APIs
>
> > https://seolgang-lee.gitbook.io/paywork/

> DB
>
> > https://dbdiagram.io/d/600290e980d742080a3691bf

---
