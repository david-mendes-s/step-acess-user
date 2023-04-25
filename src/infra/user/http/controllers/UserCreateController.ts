import {Request, Response} from 'express';
import {hash} from 'bcrypt';
import User from '../../../../modules/user/entities/UserModel';

import UserCreateService from '../../../../modules/user/useCases/UserCreateService';
import memory from '../../../../provider/memory';

export default class UserCreateController {
    
    async create(request:Request, response:Response){
        
        try{
            const {name, email, password} = request.body;
        
            const passwordhash = await hash(password, 8);
            
            const user:User = {
                name,
                email,
                password: passwordhash
            }

            const users = new UserCreateService(memory);
                      
            const createUsers = await users.execute(user);
            
            return response.status(200).json(createUsers);
        }catch(err: any){
            return response.status(err.statusCode).json(err.message);
        }    
    }

}