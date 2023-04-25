
import AppError from "../../../provider/error";
import IUserRepository from "../repository/IUserRepository";

export default class UserDeleteService {

    userRepository:IUserRepository;

    constructor(userRepository: IUserRepository){
        this.userRepository = userRepository;
    }

    async execute(email:string){

        const user = await this.userRepository.findByEmail(email);

        if(!user){
            throw new AppError('Usuário não existe');
        }

        return await this.userRepository.delete(email);
    }
}