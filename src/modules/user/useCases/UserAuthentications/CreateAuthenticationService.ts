import {compare} from 'bcrypt';
import {inject, injectable} from 'tsyringe';
import {sign} from 'jsonwebtoken';

import AppError from "../../../../provider/error";
import IUserRepository from "../../repository/IUserRepository";
import IRefreshToken from '../../../refreshToken/repository/IRefreshToken';

interface IResponse {
    id:string,
    email:string,
    name:string
}

@injectable()
export default class CreateAuthenticationService {
    
    
    constructor(
        @inject('UserRepositoryDataBase')
        private userRepository: IUserRepository, 
        @inject('RefreshTokenDataBase')
        private refreshTokenRepository:IRefreshToken
    ){}

    async execute(email:string, password:string){
        
        //Verificar se tem algum email existente
        const user = await this.userRepository.findByEmail(email);

        if(!user){
            throw new AppError("Usuário ou senha incorreta!");
        }

        //Verificar se a senha da match com o email informado

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new AppError("Usuário ou senha incorreta!");
        }

        //Criar token de usuário

        const token = sign({}, "10bbec39-83fa-4152-bbc8-24bb90595cb6", {
            subject: user.id,
            expiresIn: "20s"
        });

        const user_data:IResponse  = {
            id: user.id!,
            email: user.email,
            name: user.name
        } 

        await this.refreshTokenRepository.delete(user_data.id);

        const refreshToken = await this.refreshTokenRepository.create(user_data.id);

        return {user_data, token, refreshToken};

    }
}