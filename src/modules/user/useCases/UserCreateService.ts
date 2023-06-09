import { inject, injectable } from "tsyringe";
import UserCreateDTO from "../dto/UserCreateDTO";
import IUserRepository from "../repository/IUserRepository";

@injectable()
export default class UserService {

 

    constructor(
        @inject('UserRepositoryDataBase')
        private userRepository: IUserRepository
    ){}

    async execute({name, email, password}:UserCreateDTO){

        const user = await this.userRepository.findByEmail(email);

        if(user){    
            throw new Error('Usuário já cadastrado!!!');
        }

        const createUsers = await this.userRepository.create({name, email, password});

        return createUsers;

    }
}