import IUser from "../../../modules/user/dto/UserCreateDTO";
import User from "../../../modules/user/entities/UserModel";
import IUserRepository from "../../../modules/user/repository/IUserRepository";
import prisma from "../../../provider/prisma";

export default class UserRepositoryDataBase implements IUserRepository {
    
    
    /* private static instance: UserRepositoryDataBase; */
    
    /* static getSingleton():UserRepositoryDataBase {
        
        if (!UserRepositoryDataBase.instance) {
            UserRepositoryDataBase.instance = new UserRepositoryDataBase();
        }
        
        return UserRepositoryDataBase.instance;
    } */

    
    async delete(email: string): Promise<void> {
        await prisma.user.delete({
            where: {email}
        })
    }

    async create({ name, email, password }: IUser): Promise<User> {             
        return await prisma.user.create({data: {name, email, password}});
    }

    async find(): Promise<User[] | undefined> {
        return await prisma.user.findMany();
    }

    async findByEmail(email: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: {email}
        })
    }

}