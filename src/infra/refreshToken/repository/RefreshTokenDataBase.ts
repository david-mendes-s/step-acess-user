import dayjs from "dayjs";
import RefreshToken from "../../../modules/refreshToken/entities/TokenRefreshModel";
import IRefreshToken from "../../../modules/refreshToken/repository/IRefreshToken";

import prisma from "../../../provider/prisma";

export default class RefreshTokenRepository implements IRefreshToken {
    
    
    private static instance:RefreshTokenRepository;
    
    static getSingleton():RefreshTokenRepository {
        
        if (!RefreshTokenRepository.instance) {
            RefreshTokenRepository.instance = new RefreshTokenRepository();
        }
        
        return RefreshTokenRepository.instance;
    }
    
    async create(userId: string): Promise<RefreshToken> {
        
        const expiresIn = dayjs().add(15, "second").unix();

        const generateRefreshToken = await prisma.refreshToken.create({
            data: { expiresIn, userId }
        })

        return generateRefreshToken;

    }

    async findByToken(refresh_token: string): Promise<RefreshToken> {
       const token = await prisma.refreshToken.findFirst({
            where: {
               id: refresh_token
            }
       })

       return token;
    }

    async delete(userId: string): Promise<void> {
        await prisma.refreshToken.delete({
            where: {userId}
        })
    }

}