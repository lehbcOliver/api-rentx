import { CarsRepositoryInMemory } from '../../repositores/in-memory/CarsRepositoryInMemory';
import { ListAvailableCarsUseCase } from './ListAvailabeCarsUseCase';



let listAvailableCarsUseCase:ListAvailableCarsUseCase;
let carsRespositoryInMemoroy:CarsRepositoryInMemory;
describe('List Cars', ()=> {

	beforeEach(()=> {
		carsRespositoryInMemoroy = new CarsRepositoryInMemory();
		listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRespositoryInMemoroy);
		
	});

	it('should be able to list all available cars', async ()=> {
		const car = await carsRespositoryInMemoroy.create({
			name: 'Car1',
			description: 'Car 1 Test',
			daily_rate: 98.00,
			license_plate: 'afg-12312',
			fine_amount: 60,
			brand: 'Car Brand',
			category_id: 'category_id'
		});
		const cars = await listAvailableCarsUseCase.execute({});
		expect(cars).toEqual([car]);
	});

	it('should be able to list all available cars by brand', async()=> {
		const car = await carsRespositoryInMemoroy.create({
			name: 'Car2',
			description: 'Car 2 Test',
			daily_rate: 98.00,
			license_plate: 'afg-12312',
			fine_amount: 60,
			brand: 'Car_Brand_test',
			category_id: 'category_id'
		});
		const cars = await listAvailableCarsUseCase.execute({
			brand: 'Car_brand_test',
		});
		
		expect(cars).toEqual([car]);
	});

	it('should be able to list all available cars by name', async()=> {
		const car = await carsRespositoryInMemoroy.create({
			name: 'Car3',
			description: 'Car 3 Test',
			daily_rate: 98.00,
			license_plate: 'afg-12312',
			fine_amount: 60,
			brand: 'Car_Brand_test',
			category_id: 'category_id'
		});
		const cars = await listAvailableCarsUseCase.execute({
			name: 'Car3',
		});
		
		expect(cars).toEqual([car]);
	});
	it('should be able to list all available cars by category', async()=> {
		const car = await carsRespositoryInMemoroy.create({
			name: 'Car4',
			description: 'Car 2 Test',
			daily_rate: 98.00,
			license_plate: 'afg-12312',
			fine_amount: 60,
			brand: 'Car_Brand_test',
			category_id: '12345'
		});
		const cars = await listAvailableCarsUseCase.execute({
			category_id: '12345',
		});
		
		expect(cars).toEqual([car]);
	});
});