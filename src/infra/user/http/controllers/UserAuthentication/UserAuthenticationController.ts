import {Request, Response} from 'express';
import CreateAuthenticationService from '../../../../../modules/user/useCases/UserAuthentications/CreateAuthenticationService';

import memory from '../../../../../provider/memory';
import RefreshTokenRepository from '../../../../refreshToken/repository/RefreshTokenDataBase';

import { container } from 'tsyringe';


export default class UserAuthentication {
    
    async create(request:Request ,response:Response){
        try{
            const {email, password} = request.body;

            const user = container.resolve(CreateAuthenticationService);

            const token = await user.execute(email, password);

            return response.status(201).json(token);
        }catch(err: any){
            return response.status(400).json(err.message);
        }

    }
}