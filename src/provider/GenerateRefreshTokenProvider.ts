import { sign } from "jsonwebtoken";

export default class GenerateRefreshTokenProvider{

    async execute(userId:string){
        const token = sign({}, "10bbec39-83fa-4152-bbc8-24bb90595cb6", {
            subject: userId,
            expiresIn: "1h"
        });

        console.log('Aqui no GenerateRefresh 1h')

        return token;
    }
}