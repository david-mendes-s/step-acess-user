import { container } from 'tsyringe';

import IUserRepository from '../modules/user/repository/IUserRepository';
import UserRepositoryDataBase from '../infra/user/repository/UserRepositoryDataBase';
import IRefreshToken from '../modules/refreshToken/repository/IRefreshToken';
import RefreshTokenDataBase from '../infra/refreshToken/repository/RefreshTokenDataBase';


container.registerSingleton<IUserRepository>(
    'UserRepositoryDataBase', UserRepositoryDataBase,
);

container.registerSingleton<IRefreshToken>(
    'RefreshTokenDataBase', RefreshTokenDataBase 
);