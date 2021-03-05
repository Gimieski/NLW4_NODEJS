import { EntityRepository, Repository } from "typeorm";
import {User} from "../models/User";

@EntityRepository(User)
class usersRepositories extends Repository <User>{}
// exporta as entididades que foram passADAS POR HERANÇA Para uma classe, para o controller criar
export { usersRepositories};