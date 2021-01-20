import { createConnection } from "typeorm";
import App from "./app";

// server.ts
// 서버 실행 파일

// DB 연결 with TypeORM
createConnection()
  .then(() => console.log("Connect DB"))
  .catch((err) => console.log(err));

// 서버 인스턴스 생성 후 실행
const server = new App().getInstance();
server.listen(process.env.SERVER_PORT || 5000, () => {
  console.log(`Listening Port ${process.env.SERVER_PORT}`);
});
