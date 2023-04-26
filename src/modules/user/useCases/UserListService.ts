
import { inject, injectable } from "tsyringe";
import IUserRepository from "../repository/IUserRepository";

@injectable()
export default class UserListService {

    constructor(
        @inject('UserRepositoryDataBase')
        private userRepository: IUserRepository
    ){}

    async execute(){
        const findUsers = await this.userRepository.find();

        return findUsers;
    }
}