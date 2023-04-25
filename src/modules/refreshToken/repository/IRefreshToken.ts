import RefreshToken from "../entities/TokenRefreshModel";

export default interface IRefreshToken {
    create(userId:string):Promise<RefreshToken>;
    findByToken(refresh_token:string):Promise<RefreshToken>;
    delete(userId:string):Promise<void>;
}