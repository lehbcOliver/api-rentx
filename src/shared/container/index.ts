
import { UsersRepository } from '../../modules/accounts/infra/typeorm/repositores/UsersRepository';
import { IUsersRepository } from '../../modules/accounts/repositores/IUserRepository';
import { CarImagesRepository } from '../../modules/cars/infra/typeorm/repositores/CarImagesRepository';
import { CarsRepository } from '../../modules/cars/infra/typeorm/repositores/CarRepository';
import { CategoriesRepository } from '../../modules/cars/infra/typeorm/repositores/CategoriesRepository';
import { SpecificationRepository } from '../../modules/cars/infra/typeorm/repositores/SpecificationRepository';
import { IcarsImageRepository } from '../../modules/cars/repositores/ICarsImagesRepository';
import { ICarsRepository } from '../../modules/cars/repositores/ICarsRepository';
import { ICategoryRepository } from '../../modules/cars/repositores/ICategoryRespository';
import { ISpecificationRepository } from '../../modules/cars/repositores/ISpecificationsRepository';
import { container } from 'tsyringe';
import { IRentalsRepository } from '../../modules/rentals/repositores/IRentalsRepository';
import { RentalRepository } from '../../modules/rentals/infra/typeorm/repository/RentalRepository';
import './providers/index';
import { IUsersTokensRepository } from '../../modules/accounts/repositores/IUsersTokensRepository';
import { UsersTokensRepository } from '../../modules/accounts/infra/typeorm/repositores/UsersTokensRepository';
import { IStorageProvider } from './providers/StorageProvider/IStorageProvider';
import { LocalStorageProvider } from './providers/StorageProvider/implementations/LocalStorageProvider';
import { S3StorageProvider } from './providers/StorageProvider/implementations/S3StorageProvider';


container.registerSingleton<ICategoryRepository>(
	'CategoriesRepository',
	CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
	'SpecificationRepository',
	SpecificationRepository
);

container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository
);

container.registerSingleton<ICarsRepository> (
	'CarsRepository', 
	CarsRepository
);

container.registerSingleton<IcarsImageRepository>(
	'CarsImagesRepository',
	CarImagesRepository
);

container.registerSingleton<IRentalsRepository>(
	'RentalRepository',
	RentalRepository
);
container.registerSingleton<IUsersTokensRepository>(
	'UsersTokenRepository',
	UsersTokensRepository
);

const diskStorage = {
	local: LocalStorageProvider,
	s3: S3StorageProvider
};

container.registerSingleton<IStorageProvider>(
	'StorageProvider',
	diskStorage[process.env.disk]
);

