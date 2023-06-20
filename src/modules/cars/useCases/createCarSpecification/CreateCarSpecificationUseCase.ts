import { inject, injectable } from 'tsyringe';
import { ICarsRepository } from '../../repositores/ICarsRepository';
import { AppError } from '../../../../shared/errors/AppError';
import { ISpecificationRepository } from '../../repositores/ISpecificationsRepository';
import { Car } from '../../infra/typeorm/entities/Car';

interface IRequest{
  car_id:string;
  specifications_id:string[];
}
@injectable()
class CreateCarSpeficicationUseCase {
	constructor(@inject('CarsRepository') 
  private carsRepository:ICarsRepository,
	@inject('SpecificationRepository')
	private specificationsRepository: ISpecificationRepository){}

	async execute({car_id, specifications_id}:IRequest):Promise<Car>{
		const carExists = await this.carsRepository.findById(car_id);
		if(!carExists){
			throw new AppError('Car does not exists');
		}
		const specifications = await this.specificationsRepository.findById(specifications_id);
		carExists.specifications = specifications;
		await this.carsRepository.create(carExists);
		return carExists;
	}
}


export {CreateCarSpeficicationUseCase};