import {Request, Response} from 'express';
import UserDeleteService from '../../../../modules/user/useCases/UserDeleteService';
import { container } from 'tsyringe';

export default class UserDeleteController {
    async delete(request:Request, response:Response){
      
        const { email } = request.body;
    
        const users = container.resolve(UserDeleteService);

        await users.execute(email);

        return response.status(200).json({message: 'usuário deletado com sucesso'});
       
    }
}