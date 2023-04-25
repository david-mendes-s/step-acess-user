import { Request, Response, NextFunction } from "express";
import { verify } from 'jsonwebtoken';

export default function ensureAuthentication(request:Request, response:Response, next:NextFunction){
    const authToken = request.headers.authorization;

    if(!authToken){
        return response.status(401).json(
            {message: 'você não tem permissão para acessar essa rota'}
        )
    }

    const [, token] = authToken.split(" ");

    try{
        verify(token, "10bbec39-83fa-4152-bbc8-24bb90595cb6");

        return next();
    }catch(err){
        return response.status(401).json(
            {message: 'token inválido'}
        )
    }
    


}