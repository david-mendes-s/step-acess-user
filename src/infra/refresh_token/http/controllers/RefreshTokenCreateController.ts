import { Request, Response } from "express";
import { container } from "tsyringe";
import RefreshTokenService from "../../../../modules/refresh_token/useCases/RefreshTokenService";

export default class RefreshTokenCreateController {
    async create(request:Request, response:Response){
        const token = 
        request.body.token || 
        request.headers["x-access-token"] || 
        request.query.token;

        const refreshTokenService = container.resolve(RefreshTokenService);

        const refresh_token = await refreshTokenService.execute(token);

        return response.status(201).json(refresh_token);
    }
}