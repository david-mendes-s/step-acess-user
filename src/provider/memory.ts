import UserRepositoryMemory from "../infra/user/repository/UserRepositoryMemory";
import UserRepositoryDataBase from "../infra/user/repository/UserRepositoryDataBase";

const memory = UserRepositoryMemory.getSingleton();

export default memory;