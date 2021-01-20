import "reflect-metadata";
import "dotenv/config";
import express from "express";
import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";

import authRouter from "./routes/auth.routes";
import postRouter from "./routes/post.routes";

// app.ts
// Node 실행 환경 정의 클래스
export class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(morgan("dev"));
    this.app.use(
      cors({
        origin: ["*"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
      })
    );
    this.app.use("/auth", authRouter);
    this.app.use("/post", postRouter);
  }

  public getInstance() {
    return this.app;
  }
}

export default App;
