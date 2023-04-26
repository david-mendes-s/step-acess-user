import { Request, Response, NextFunction } from "express";
import { verify } from 'jsonwebtoken';
import auth from "../../../../config/auth";
import RefreshTokenRepositoryDataBase from "../../../refresh_token/repository/RefreshTokenRepositoryDataBase";

interface IPayload {
    sub:string;
}

export default async function ensureAuthentication(request:Request, response:Response, next:NextFunction){
    
    
        const authToken = request.headers.authorization;
    
        const refreshTokenRepositoryDataBase = new RefreshTokenRepositoryDataBase();
        
        if(!authToken){
            throw new Error('você não tem permissão para acessar essa rota');    
        }
    
        const [,token] = authToken.split(" ");
        
            console.log("entrou "+token)
            const { sub } = verify(
                token, auth.secret_refresh_token
            ) as IPayload;
            
            console.log(sub)
            const user = await refreshTokenRepositoryDataBase.findByUserIdAndRefreshToken(sub, token);
                
            
            if(!user){
                throw new Error('token não existe');
            }
    
        /* request.user = {
            id: user_id
        } */
    
        return next();
    
}