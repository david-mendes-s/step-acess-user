
import IUserRepository from "../repository/IUserRepository";

export default class UserListService {

    userRepository:IUserRepository;

    constructor(userRepository: IUserRepository){
        this.userRepository = userRepository;
    }

    async execute(){
        const findUsers = await this.userRepository.find();

        return findUsers;
    }
}