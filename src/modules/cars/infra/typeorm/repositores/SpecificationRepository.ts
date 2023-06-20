import { Repository, getRepository } from 'typeorm';
import { ICreateSpecificationDTO, ISpecificationRepository } from '../../../repositores/ISpecificationsRepository';
import { Specification } from '../entities/Specification';


class SpecificationRepository implements ISpecificationRepository{
	private repository:Repository<Specification>;

	constructor(){
		this.repository = getRepository(Specification);
	}
	

	async findByName(name: string): Promise<Specification> {
		const specification = await this.repository.findOne({where: {name}});
		return specification;
	}

	async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
		const specification = this.repository.create({
			name, 
			description
		});
		await this.repository.save(specification);
		return specification;
	}
	async findById(ids: string[]): Promise<Specification[]> {
		const specifications = await this.repository.findByIds(ids);
		return specifications;
	}
}


export {SpecificationRepository};