import {Request, Response} from 'express';
import UserListService from '../../../../modules/user/useCases/UserListService';
import memory from '../../../../provider/memory';

export default class UserListController {
    async index(request:Request, response:Response){
        const users = new UserListService(memory);
        
        const listUsers = await users.execute();

        return response.status(200).json(listUsers);
    }
}