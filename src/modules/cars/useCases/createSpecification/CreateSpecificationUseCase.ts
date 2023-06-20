import { inject, injectable } from 'tsyringe';
import { ISpecificationRepository } from '../../repositores/ISpecificationsRepository';
import { AppError } from '../../../../shared/errors/AppError';


interface IRequest{
	name:string;
	description:string;
}
@injectable()
class CreateSpecificationUseCase{
	constructor(@inject('SpecificationRepository')
		private specificationRepostory: ISpecificationRepository){}
	async execute({name, description}:IRequest):Promise<void>{
		const specificationAlreadyExists = await this.specificationRepostory.findByName(name);
		if(specificationAlreadyExists){
			throw new AppError('Specification already exists');
		}
		await this.specificationRepostory.create({
			name,
			description
		});
	}
}

export {CreateSpecificationUseCase};