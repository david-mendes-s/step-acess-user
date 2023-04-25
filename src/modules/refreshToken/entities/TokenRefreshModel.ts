import {randomUUID} from 'crypto';
import { RefreshToken } from "@prisma/client";


export default class RefreshTokens {
    id?: string;
    expiresIn: number;
    userId: string;

    constructor(expiresIn:number, userId:string){
        if(!this.id){
            this.id = randomUUID();
        }        
        this.expiresIn = expiresIn;
        this.userId = userId;
    }
}