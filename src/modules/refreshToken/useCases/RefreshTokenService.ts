import { inject, injectable } from "tsyringe";
import IRefreshToken from "../repository/IRefreshToken";
import AppError from "../../../provider/error";
import { sign } from "jsonwebtoken";
import GenerateRefreshTokenProvider from "../../../provider/GenerateRefreshTokenProvider";
import dayjs from "dayjs";

@injectable()
export default class RefreshTokenService {
    
    constructor(
        @inject('RefreshTokenDataBase')
        private refreshTokenRepository: IRefreshToken
    ){}
    
    async execute(refreshToken:string){
        const refresh_token = await this.refreshTokenRepository.findByToken(refreshToken);
        
        if(!refresh_token){
            throw new AppError('token inválido');
        }

        const refreshTokenExpired = dayjs().isAfter(
            dayjs.unix(refresh_token.expiresIn)
        )

        console.log(refreshTokenExpired);

        const generateTokenProvider = new GenerateRefreshTokenProvider();
        const token = await generateTokenProvider.execute(refresh_token.userId);

        if(refreshTokenExpired){
            await this.refreshTokenRepository.delete(refresh_token.userId);


            const newRefreshToken = await this.refreshTokenRepository.create(refresh_token.userId);

            return { token, newRefreshToken};

        } 

        return {token};

    }
}