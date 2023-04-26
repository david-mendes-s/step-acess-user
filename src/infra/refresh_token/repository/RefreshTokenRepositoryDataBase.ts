import RefreshTokenCreateDTO from "../../../modules/refresh_token/dto/RefreshTokenCreateDTO";
import RefreshToken from "../../../modules/refresh_token/entities/refreshTokenModal";
import IRefreshTokenRepository from "../../../modules/refresh_token/repository/IRefreshTokenRepository";
import prisma from "../../../provider/prisma";

export default class RefreshTokenRepositoryDataBase implements IRefreshTokenRepository {
    async create({ user_id, expires_date, refresh_token }: RefreshTokenCreateDTO): Promise<RefreshToken> {
        const token = await prisma.refreshToken.create({
            data: {
                refresh_token,
                user_id,
                expires_date
            }
        })

        return token;
    }

    async findByUserIdAndRefreshToken(user_id: string, refresh_token:string):Promise<RefreshToken> {
        const user =  await prisma.refreshToken.findFirst({
            where: {user_id: user_id, refresh_token: refresh_token}
        });

        return user;
    }

    async deleteById(id: string): Promise<void> {
        await prisma.refreshToken.delete({
            where: {id}
        });
    }

 }