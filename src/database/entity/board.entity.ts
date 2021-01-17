import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  BOARD_SEQ: number;

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
