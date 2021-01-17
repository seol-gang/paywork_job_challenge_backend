import {
  AfterLoad,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import * as crypto from "crypto";
import { encrypt } from "../../common/dataEncrypt";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  USER_SEQ: number;

  @Column({
    length: 100,
  })
  EMAIL: string;

  @Column({
    length: 255,
  })
  PASSWORD: string;

  @Column({
    length: 20,
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

  @BeforeInsert()
  encryptPassword() {
    this.PASSWORD = encrypt(this.PASSWORD);
  }
}
