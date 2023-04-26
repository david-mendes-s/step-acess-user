
import { inject, injectable } from "tsyringe";
import IUserRepository from "../repository/IUserRepository";

@injectable()
export default class UserDeleteService {

    constructor(
        @inject('UserRepositoryDataBase')
        private userRepository: IUserRepository
    ){}
    async execute(email:string){

        const user = await this.userRepository.findByEmail(email);

        if(!user){
            throw new Error('Usuário não existe');
        }

        return await this.userRepository.delete(email);
    }
}