import { CarsRepositoryInMemory } from '../../repositores/in-memory/CarsRepositoryInMemory';
import { CreateCarSpeficicationUseCase } from './CreateCarSpecificationUseCase';
import { AppError } from '../../../../shared/errors/AppError';
import { SpecificationRepositoryInMemory } from '../../repositores/in-memory/SpecificationRepositoryInMemory';

let createCarSpecificationUseCase: CreateCarSpeficicationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;

describe('Create Car Specification', ()=> {
	beforeEach(()=> {
		carsRepositoryInMemory = new CarsRepositoryInMemory();
		specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();
		createCarSpecificationUseCase = new CreateCarSpeficicationUseCase(carsRepositoryInMemory,specificationsRepositoryInMemory);
	});

	it('should not be able to add a new specification to a now-existent car', async ()=> {
		const car_id = '12345';
		const specifications_id = ['54321'];

		await expect(createCarSpecificationUseCase.execute({car_id, specifications_id}))
			.rejects.toEqual(new AppError('Car does not exists'));
	});

	it('should be able to add a new specification to the car', async ()=> {
		const car = await carsRepositoryInMemory.create({
			name: 'Name Car',
			description: 'Description Car',
			daily_rate: 100,
			license_plate: '21993022',
			fine_amount: 80,
			brand: 'car brand',
			category_id: 'category_id'
		});
		const specification = await specificationsRepositoryInMemory.create({
			description: 'name description',
			name: 'test'

		});
		const specifications_id = [specification.id];
		const specificationsCar = await createCarSpecificationUseCase.execute({car_id: car.id, specifications_id});
		expect(specificationsCar).toHaveProperty('specifications');
		expect(specificationsCar.specifications.length).toBe(1);
	});
});