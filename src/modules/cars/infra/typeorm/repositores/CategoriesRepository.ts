import { ICategoryRepository, ICreateCategoryDTO } from '../../../repositores/ICategoryRespository';
import { Category } from '../entities/Category';
import {Repository, getRepository} from 'typeorm';


class CategoriesRepository implements ICategoryRepository{
	private repository:Repository<Category>;
	
	constructor(){
		this.repository = getRepository(Category);
	}

	async create({name, description}: ICreateCategoryDTO):Promise<void>{
		const category =  this.repository.create({
			name,
			description
		});

		await this.repository.save(category);
	}

	async list():Promise<Category[]>{
		const categories = await this.repository.find();
		return categories;
	}

	async findByName(name:string):Promise<Category>{
		const category = await  this.repository.findOne({
			where: {name}
		});
		return category;
	}
}

export {CategoriesRepository};