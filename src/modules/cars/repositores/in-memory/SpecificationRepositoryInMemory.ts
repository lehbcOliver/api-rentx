import { Specification } from '../../infra/typeorm/entities/Specification';
import { ICreateSpecificationDTO, ISpecificationRepository } from '../ISpecificationsRepository';

class SpecificationRepositoryInMemory implements ISpecificationRepository {
	
	specifications:Specification[] = [];
	async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
		const specification = new Specification();
		Object.assign(specification,{
			description,
			name,
		});
		this.specifications.push(specification);
		return specification;
	}
	async findByName(name: string): Promise<Specification> {
		return this.specifications.find((specification)=> specification.name === name );
	}
	async findById(ids: string[]): Promise<Specification[]> {
		const allSpecifications = await this.specifications.filter(specification => ids.includes(specification.id));
		return  allSpecifications;
	}
  
}
export {SpecificationRepositoryInMemory};