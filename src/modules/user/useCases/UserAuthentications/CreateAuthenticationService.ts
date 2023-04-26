import {compare} from 'bcrypt';
import {inject, injectable} from 'tsyringe';
import {sign} from 'jsonwebtoken';

import IUserRepository from "../../repository/IUserRepository";
import auth from '../../../../config/auth';
import IRefreshTokenRepository from '../../../refresh_token/repository/IRefreshTokenRepository';
import IDateProvider from '../../../../provider/DateProvider/IDateProvider';


interface IResponse {
    token: string,
    user: {
        id:string,
        email:string,
        name:string
    }
    refresh_token: string
}

@injectable()
export default class CreateAuthenticationService {
    
    
    constructor(
        @inject('UserRepositoryDataBase')
        private userRepository: IUserRepository, 

        @inject('RefreshTokenRepositoryDataBase')
        private refreshTokenRepository: IRefreshTokenRepository,

        @inject('DayJSDateProvider')
        private dayJSDateProvider: IDateProvider    
    ){}

    async execute(email:string, password:string){
        
        //Verificar se tem algum email existente
        const user = await this.userRepository.findByEmail(email);

        if(!user){
            throw new Error("Usuário ou senha incorreta!");
        }

        //Verificar se a senha da match com o email informado

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new Error("Usuário ou senha incorreta!");
        }

        //Criar token de usuário

        const token = sign({}, auth.secret_token, {
            subject: user.id,
            expiresIn: auth.expires_in_token
        });

        //criação do refresh token
        const refresh_token = sign({email}, auth.secret_refresh_token, {
            subject: user.id,
            expiresIn: auth.expires_in_refresh_token
        }); 

        const refresh_token_expires_date = this.dayJSDateProvider.addDays(auth.expires_refresh_token_days);

        await this.refreshTokenRepository.create({
            user_id: user.id,
            refresh_token: refresh_token, 
            expires_date: refresh_token_expires_date
        });
        //fim da criação do refresh token

        const user_data:IResponse  = {
            token,
            user: {
                id: user.id!,
                email: user.email,
                name: user.name
            },
            refresh_token
        } 

        return user_data;

    }
}