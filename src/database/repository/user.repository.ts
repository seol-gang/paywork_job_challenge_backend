import { EntityRepository, Repository } from "typeorm";
import { encrypt } from "../../util/dataEncrypt";
import { User } from "../entity/user.entity";

// user.repository.ts
// 유저 인증 기능 수행 시 DB 처리 부분 정의
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // 로그인 시 회원 정보를 찾기 위한 함수
  verifyLogin(email: string, password: string) {
    password = encrypt(password);
    return this.createQueryBuilder("user")
      .where("user.email = :email", { email })
      .andWhere("user.password = :password", { password })
      .getOne();
  }
}
