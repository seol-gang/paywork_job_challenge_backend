import { EntityRepository, Repository } from "typeorm";
import { encrypt } from "../../common/dataEncrypt";
import { User } from "../entity/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findByEmail(email: string) {
    return this.createQueryBuilder("user")
      .where("user.email = :email", { email })
      .getOne();
  }
  verifyLogin(email: string, password: string) {
    password = encrypt(password);
    return this.createQueryBuilder("user")
      .where("user.email = :email", { email })
      .andWhere("user.password = :password", { password })
      .getOne();
  }
}
