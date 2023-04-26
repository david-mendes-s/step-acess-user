import { RefreshToken as PrismaRefreshToken } from "@prisma/client";

export default class RefreshToken implements PrismaRefreshToken{
    id: string;
    refresh_token: string;
    expires_date: Date;
    user_id: string;
    createdAt: Date;
}