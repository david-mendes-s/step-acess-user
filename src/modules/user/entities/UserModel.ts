import {randomUUID} from 'crypto';
import { User as UserModelPrimas } from '@prisma/client';

export default class User{
    readonly id?:string;
    name: string;
    email: string;
    password: string;

    constructor(name:string, email:string, password:string){
        if(!this.id){
            this.id = randomUUID();
        }        
        this.name = name;
        this.email = email;
        this.password = password;
    }
    createdAt?: Date;
    updatedAt?: Date;
}