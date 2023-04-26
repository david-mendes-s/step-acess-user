import { inject, injectable } from "tsyringe";
import IRefreshTokenRepository from "../repository/IRefreshTokenRepository";
import { sign, verify } from "jsonwebtoken";
import auth from "../../../config/auth";
import IDateProvider from "../../../provider/DateProvider/IDateProvider";

interface IPayload {
    sub:string;
    email:string;
}

@injectable()
export default class RefreshTokenService {
    
    constructor(
        @inject('RefreshTokenRepositoryDataBase')
        private refreshTokenRepository: IRefreshTokenRepository,

        @inject('DayJSDateProvider')
        private dayJSDateProvider: IDateProvider  
    ){}

    async execute(refresh_token: string):Promise<string>{
        const {sub, email} = verify(refresh_token, auth.secret_refresh_token) as IPayload;

        const user_id = sub;

        const userToken = await this.refreshTokenRepository.findByUserIdAndRefreshToken(user_id, refresh_token);

        if(!userToken){
            throw new Error('refresh token não existe');
        }

        await this.refreshTokenRepository.deleteById(userToken.id);

        const refresh_token_expires_date = this.dayJSDateProvider.addDays(auth.expires_refresh_token_days);

        const create_refresh_token = sign({email}, auth.secret_refresh_token, {
            subject: user_id,
            expiresIn: auth.expires_in_refresh_token
        });
        
        await this.refreshTokenRepository.create({
            user_id: user_id,
            refresh_token: create_refresh_token, 
            expires_date: refresh_token_expires_date
        });

        return create_refresh_token;

    }
}