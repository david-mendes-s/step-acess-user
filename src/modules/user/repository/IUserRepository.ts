import UserCreateDTO from "../dto/UserCreateDTO";
import User from "../entities/UserModel";

export default interface IUserRepository {
    create({name, email, password}:UserCreateDTO):Promise<User>;
    find():Promise<User[] | undefined>;
    findByEmail(email:string):Promise<User | null | undefined>;
    delete(email:string):Promise<void>;
}