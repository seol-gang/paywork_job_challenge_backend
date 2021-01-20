import {
  AfterLoad,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { encrypt } from "../../util/dataEncrypt";
import { Post } from "./post.entity";

// user.entity.ts
// TypeORM Entity를 이용하여 user 테이블 정의
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  USER_SEQ: number;

  @Column({
    length: 100,
    unique: true,
  })
  EMAIL: string;

  @Column({
    length: 255,
  })
  PASSWORD: string;

  @Column({
    length: 20,
    unique: true,
  })
  NICKNAME: string;

  @Column({
    length: 20,
  })
  PHONE: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @BeforeInsert()
  encryptPassword(): void {
    this.PASSWORD = encrypt(this.PASSWORD);
  }
}
