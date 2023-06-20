import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '../../../../shared/errors/AppError';
import { UserRepositoryInMemory } from '../../repositores/in-memory/UsersRepositoryInMemory';
import { UsersTokenRepositoryInMemory } from '../../repositores/in-memory/UsersTokensRepositoryInMemory';
import { SendForgotPasswordUseCase } from './SendForgotPasswordMailUseCase';


let usersRepositoryInMemory: UserRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokenRepositoryInMemory;
let mailProvider: MailProviderInMemory;
let sendForgotPasswordMailUseCase:  SendForgotPasswordUseCase;

describe('Send Forgot Mail', ()=> {
	beforeEach(()=> {
		usersRepositoryInMemory = new UserRepositoryInMemory();
		dateProvider = new DayjsDateProvider();
		usersTokensRepositoryInMemory = new UsersTokenRepositoryInMemory();
		mailProvider = new MailProviderInMemory();
		sendForgotPasswordMailUseCase = new SendForgotPasswordUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
	});

	it('should be able to send a forgot password mail to user', async()=> {
		const sendMail = jest.spyOn(mailProvider, 'sendMail');
		await usersRepositoryInMemory.create({
			driver_license: '12332112',
			email: 'teste@rentx.com.br',
			name: 'Teste',
			password: '123123'
		});
		await sendForgotPasswordMailUseCase.execute('teste@rentx.com.br');
		expect(sendMail).toHaveBeenCalled();
	});

	it('should not be able to send an email if user does not exists', async ()=>{
		await expect(
			sendForgotPasswordMailUseCase.execute('caju@teste.com.br')
		).rejects.toEqual(new AppError('User does not exists'));
	});

	it('should be able to create a users token', async()=> {
		const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, 'create');
		await usersRepositoryInMemory.create({
			driver_license: '1111222222',
			email: 'teste2@rentx.com.br',
			name: 'TesteToken',
			password: '123123'
		});
		await sendForgotPasswordMailUseCase.execute('teste2@rentx.com.br');
		expect(generateTokenMail).toBeCalled();
	});
});