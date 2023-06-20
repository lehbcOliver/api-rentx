import { inject, injectable } from 'tsyringe';
import { ICategoryRepository } from '../../repositores/ICategoryRespository';
import { Category } from '../../infra/typeorm/entities/Category';

@injectable()
class ListCategoriesUseCase{
	constructor(@inject('CategoriesRepository')
		private categoriesRepository: ICategoryRepository){}

	async execute():Promise<Category[]>{
		const categories = await this.categoriesRepository.list();
		return categories;
	}

}

export {ListCategoriesUseCase};