import {
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

// post.entity.ts
// TypeORM Entity를 이용하여 post 테이블 정의
@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  POST_SEQ: number;

  @Column({
    length: 256,
  })
  TITLE: string;

  @Column("text")
  CONTENT: string;

  @Column({
    default: 0,
  })
  HIT: number;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: "USER_SEQ" })
  user: User;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
