import RefreshTokenCreateDTO from "../dto/RefreshTokenCreateDTO";
import RefreshToken from "../entities/refreshTokenModal";


export default interface IUserRepository {
    create({ user_id, expires_date, refresh_token}:RefreshTokenCreateDTO):Promise<RefreshToken>;
    findByUserIdAndRefreshToken(user_id:string, refresh_token:string):Promise<RefreshToken>;
    deleteById(id:string):Promise<void>;
}