import request from 'supertest';
import { app } from '../../../../shared/infra/http/app';
import createConection from '../../../../shared/infra/typeorm';
import { Connection } from 'typeorm';
import { hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';

let connection: Connection;

describe('List Categories',()=> {
	beforeAll(async ()=> {
		connection = await createConection();
		await connection.runMigrations();
		const id = uuid();
		const password = await hash('admin',10);

		await connection.query(
			`INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) 
    values ('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', '12309303') `
		);
	});
	afterAll(async ()=> {
		await connection.dropDatabase();
		await connection.close();
	});

	it('should be able to list all  categories', async()=> {
		const responseToken = await request(app).post('/sessions').send({
			email:'admin@rentx.com.br', 
			password: 'admin'
		});
		
		const {refresh_token} = responseToken.body;

		await request(app).post('/categories').send({
			name: 'Category SuperTest',
			description: 'Category super test'
		}).set({
			Authorization: `Bearer ${refresh_token}`,
		});
		const response = await request(app).get('/categories');
		
		expect(response.status).toBe(200);
		expect(response.body.length).toBe(1);
		expect(response.body[0]).toHaveProperty('id');
	});
	
});
