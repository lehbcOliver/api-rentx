import { inject, injectable } from 'tsyringe';
import { IRentalsRepository } from '../../repositores/IRentalsRepository';
import { Rental } from '../../infra/typeorm/entities/Rental';

@injectable()
class ListRentalsByUserUseCase {
	constructor(@inject('RentalRepository')
  private rentalsRepository: IRentalsRepository){}
	async execute(user_id:string):Promise<Rental[]>{
		const rentalsByUser = await this.rentalsRepository.findByUser(user_id);
		return rentalsByUser;
	}
}

export {ListRentalsByUserUseCase};