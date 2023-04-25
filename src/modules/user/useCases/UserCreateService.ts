import AppError from "../../../provider/error";
import UserCreateDTO from "../dto/UserCreateDTO";
import IUserRepository from "../repository/IUserRepository";

export default class UserService {

    userRepository:IUserRepository;

    constructor(userRepository: IUserRepository){
        this.userRepository = userRepository;
    }

    async execute({name, email, password}:UserCreateDTO){

        const user = await this.userRepository.findByEmail(email);

        if(user){    
            throw new AppError('Usuário já cadastrado!!!');
        }

        const createUsers = await this.userRepository.create({name, email, password});

        return createUsers;

    }
}