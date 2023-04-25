import {randomUUID} from 'crypto';

export default class User {
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
}