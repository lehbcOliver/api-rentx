import {parse as csvParse} from 'csv-parse';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';
import { CategoriesRepository } from '../../infra/typeorm/repositores/CategoriesRepository';

interface  IImportCategory{
	name:string;
	description:string;
}

@injectable()
class ImportCategoryUseCase{

	constructor(@inject('CategoriesRepository')
		private categoryRepository: CategoriesRepository){}
	
	loadCateogories(file:Express.Multer.File):Promise<IImportCategory[]>{
		return new Promise((resolve, reject)=> {
			const categories:IImportCategory[] = [];

			const stream = fs.createReadStream(file.path);

			const parseFile = csvParse();
			stream.pipe(parseFile);
			parseFile.on('data', async (line)=>{
				const [name, description] = line;
				categories.push({
					name,
					description
				});
			})
				.on('end', ()=> {
					resolve(categories);
				}).on('error', (err)=> {
					reject(err);
				});
		});
	}
	async execute(file:Express.Multer.File):Promise<void>{
		const categories = await  this.loadCateogories(file);
		categories.map(async (category)=> {
			const {name, description} = category;
			const existCategory = this.categoryRepository.findByName(name);
			if(!existCategory){
				this.categoryRepository.create({
					name,
					description
				});
			}
		});
	}
}

export {ImportCategoryUseCase};