import {Request, Response} from 'express';
import memory from '../../../../provider/memory';
import UserDeleteService from '../../../../modules/user/useCases/UserDeleteService';

export default class UserDeleteController {
    async delete(request:Request, response:Response){
        try{
            const { email } = request.body;
        
            const users = new UserDeleteService(memory);

            await users.execute(email);

            return response.status(200).json({message: 'usuário deletado com sucesso'});
        }catch(err: any){
            return response.status(err.statusCode).json(err.message);
        }
    }
}