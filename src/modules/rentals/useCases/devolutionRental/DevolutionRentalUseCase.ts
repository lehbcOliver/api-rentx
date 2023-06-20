import { inject, injectable } from 'tsyringe';
import { IRentalsRepository } from '../../repositores/IRentalsRepository';
import { ICarsRepository } from '../../../cars/repositores/ICarsRepository';
import { AppError } from '../../../../shared/errors/AppError';
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { Rental } from '../../infra/typeorm/entities/Rental';


interface IRequest{
  id:string;
  user_id:string;
}

@injectable()
class DevolutionRentalUseCase {

	constructor(@inject('RentalRepository')
  private rentalsRepository: IRentalsRepository,
  @inject('CarsRepository')
  private carsRepository: ICarsRepository,
  @inject('DayjsDateProvider')
  private dateProvider: IDateProvider){}

	async execute({id, user_id}:IRequest):Promise<Rental>{
		const rental = await this.rentalsRepository.findById(id);
		const car = await this.carsRepository.findById(rental.car_id);

		if(!rental){
			throw new AppError('Rental does not exists');
		}
		const dateNow = this.dateProvider.dateNow();
		let daily = this.dateProvider.compareInDays(rental.start_date, this.dateProvider.dateNow());
		if(daily <= 0){
			daily = 1;
		}
		const delay = this.dateProvider.compareInDays(dateNow, rental.expected_return_date);

		let total = 0;
		if(delay > 0){
			const calculte_fine = delay * car.fine_amount;
			total = calculte_fine;
		}
		total += daily * car.daily_rate;
		rental.end_date = this.dateProvider.dateNow();
		rental.total = total;
		await this.rentalsRepository.create(rental);
		await this.carsRepository.updateAvailable(car.id, true);
		return rental;
	}
  
}

export {DevolutionRentalUseCase};