import UserCreateDTO from "../../../modules/user/dto/UserCreateDTO";
import User from "../../../modules/user/entities/UserModel";
import IUserRepository from "../../../modules/user/repository/IUserRepository";

export default class UserRepositoryMemory implements IUserRepository{
    
    private array:User[];
    private static instance: UserRepositoryMemory;

    private constructor(){
        this.array = [];
    }
    
    static getSingleton():UserRepositoryMemory {
        
        if (!UserRepositoryMemory.instance) {
            UserRepositoryMemory.instance = new UserRepositoryMemory();
        }
        
        return UserRepositoryMemory.instance;
    }
    
    findByEmail(email: string): Promise<User | null | undefined> {
        const user = this.array.find(user => user.email === email);
        
        return Promise.resolve(user);
    }
    
    create({name, email, password}:UserCreateDTO): Promise<User> {
        const user = new User(name, email, password);
        
        this.array.push(user);
        
        console.log(user);
        
        return Promise.resolve(user);
    }
    
    find(): Promise<User[] | undefined> {
        const users = this.array.map(user => user);
        
        return Promise.resolve(users);
    }
    
    delete(email: string): Promise<void> {
        const findEmail = this.array.findIndex(user => user.email === email);

        this.array.splice(findEmail, 1);

        return Promise.resolve();
    }
}