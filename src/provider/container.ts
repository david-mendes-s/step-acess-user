import { container } from 'tsyringe';

import IUserRepository from '../modules/user/repository/IUserRepository';
import UserRepositoryDataBase from '../infra/user/repository/UserRepositoryDataBase';
import IRefreshTokenRepository from '../modules/refresh_token/repository/IRefreshTokenRepository';
import RefreshTokenRepositoryDataBase from '../infra/refresh_token/repository/RefreshTokenRepositoryDataBase';


container.registerSingleton<IUserRepository>(
    'UserRepositoryDataBase', UserRepositoryDataBase,
);

container.registerSingleton<IRefreshTokenRepository>(
    'RefreshTokenRepositoryDataBase', RefreshTokenRepositoryDataBase,
);