import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { SendForgotPasswordUseCase } from './SendForgotPasswordMailUseCase';

class SendForgotPasswordMailController{
	async handle(request:Request, response:Response):Promise<Response>{
		const {email} = request.body;
		const sendForgotPasswordMailUseCase = container.resolve(SendForgotPasswordUseCase);
		sendForgotPasswordMailUseCase.execute(email);
		return response.send();
	}
}

export {SendForgotPasswordMailController};