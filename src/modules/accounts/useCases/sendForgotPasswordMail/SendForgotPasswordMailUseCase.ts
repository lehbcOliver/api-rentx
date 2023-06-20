import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../repositores/IUserRepository';
import { AppError } from '../../../../shared/errors/AppError'; 
import { v4 as uuid } from 'uuid';
import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { IUsersTokensRepository } from '../../repositores/IUsersTokensRepository';
import { IMailProvider } from '../../../../shared/container/providers/MailProvider/IMailProvider';
import {resolve} from 'path';

@injectable() 
class SendForgotPasswordUseCase{

	constructor(@inject('UsersRepository')
  private usersRepository: IUsersRepository,
  @inject('UsersTokenRepository')
  private usersTokensRepository: IUsersTokensRepository, 
  @inject('DayjsDateProvider')
  private dayjsDateProvider: DayjsDateProvider,
  @inject('EtherealMailProvider')
  private etherealMailProvider: IMailProvider){}

	async execute(email:string):Promise<void>{
		const templatePath = resolve(__dirname, '..', '..', 'views', 'emails', 'forgotPassword.hbs');
		const user = await this.usersRepository.findByEmail(email);

		if(!user){
			throw new AppError('User does not exists');
		}
		const token = uuid();

		const expires_date = this.dayjsDateProvider.addHours(3);
		await this.usersTokensRepository.create({
			refresh_token: token,
			user_id: user.id,
			expires_date,
		});
		const variables = {
			name:user.name,
			link:`${process.env.FORGOT_MAIL_URL}${token}`
		};
		await this.etherealMailProvider.sendMail(
			email,
			'recuperacao de senha',
			variables,
			templatePath
		);
	}
}

export {SendForgotPasswordUseCase};