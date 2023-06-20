import { inject, injectable } from 'tsyringe';
import { IcarsImageRepository } from '../../repositores/ICarsImagesRepository';

interface IRequest {
  car_id: string;
  images_name:string[];
}
@injectable()
class UploadCarImageUseCase {

	constructor(@inject('CarsImagesRepository') 
  private carsImageRepository: IcarsImageRepository){}

	async execute({car_id,images_name}:IRequest):Promise<void>{
		images_name.map(async image=> {
			await this.carsImageRepository.create(car_id, image);
		});
	}
}

export {UploadCarImageUseCase};