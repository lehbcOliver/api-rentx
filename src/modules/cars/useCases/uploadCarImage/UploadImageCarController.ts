import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UploadCarImageUseCase } from './UploadCarImageUseCase';


interface IFiles{
  filename:string;
}

class UploadImageCarController {
  
	async handle(request:Request, response:Response):Promise<Response>{
		const {id} = request.params;
		const images = request.files as IFiles[];
		const images_name = images.map((file)=> file.filename);
		const uploadCarImagesUseCase = container.resolve(UploadCarImageUseCase);
		await uploadCarImagesUseCase.execute({
			car_id:id,
			images_name
		});
		return response.status(201).send();
	}
}

export {UploadImageCarController};