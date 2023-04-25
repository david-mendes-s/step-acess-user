import { Request, Response } from "express";
import { container } from "tsyringe";
import RefreshTokenService from "../../../modules/refreshToken/useCases/RefreshTokenService";

export default class RefreshTokenController {
    async create(request:Request, response:Response){

        try{
            const {refresh_token} = request.body || request.headers["x-access-token"] || request.query

            const refreshTokenService = container.resolve(RefreshTokenService);
    
            const token = await refreshTokenService.execute(refresh_token); 
    
            return response.status(200).json(token);
        }catch(err:any){
            return response.status(400).json(err.message)
        }

    }
}