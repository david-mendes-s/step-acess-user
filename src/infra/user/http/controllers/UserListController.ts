import {Request, Response} from 'express';
import UserListService from '../../../../modules/user/useCases/UserListService';
import { container } from 'tsyringe';

export default class UserListController {
    async index(request:Request, response:Response){
        const users = container.resolve(UserListService);
        
        const listUsers = await users.execute();

        return response.status(200).json(listUsers);
    }
}