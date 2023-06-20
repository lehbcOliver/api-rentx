
import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateuserDTO';
import { UserRepositoryInMemory } from '../../repositores/in-memory/UsersRepositoryInMemory';
import { UsersTokenRepositoryInMemory } from '../../repositores/in-memory/UsersTokensRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UserRepositoryInMemory;
let usersTokenRepositoryInMemory: UsersTokenRepositoryInMemory;
let createUserUseCase : CreateUserUseCase;
let dateProvider: DayjsDateProvider;

describe('Authentica user', ()=> {
	beforeEach(()=> {
		usersRepositoryInMemory = new UserRepositoryInMemory();
		usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory();
		dateProvider = new DayjsDateProvider();
		authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory, usersTokenRepositoryInMemory, dateProvider);
		createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
	});

	it('should be able to authenticate an user', async ()=> {
		const user: ICreateUserDTO = {
			driver_license: '000123',
			email: 'user@test.com',
			password: '1234',
			name: 'User Teste'
		};
		await createUserUseCase.execute(user);
		const result =  await authenticateUserUseCase.execute({
			email: user.email,
			password: user.password
		});
		expect(result).toHaveProperty('token');
	});

	it('should not be able to authenticate an nonexistent user', async ()=> {
		await expect(authenticateUserUseCase.execute({
			email: 'false@email.com',
			password: '1223123'
		})).rejects.toEqual(new AppError('Email or password incorrect'));
	});

	it('should not be able to authenticate with incorret password', async ()=> {
		const user: ICreateUserDTO = {
			driver_license: '99999',
			email: 'user@user.com',
			password: '1234',
			name: 'User teste'
		};
		await createUserUseCase.execute(user);
		await expect(authenticateUserUseCase.execute({
			email: user.email,
			password: '0980'
		})).rejects.toEqual(new AppError('Email or password incorrect'));
	});
});