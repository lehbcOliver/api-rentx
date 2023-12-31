import { Repository, getRepository } from 'typeorm';
import { IUsersRepository } from '../../../repositores/IUserRepository';
import { User } from '../entities/User';
import { ICreateUserDTO } from '../../../dtos/ICreateuserDTO';


class UsersRepository implements IUsersRepository{
	private repository:Repository<User>;

	constructor(){
		this.repository = getRepository(User);
	}
	
	async create({name, email, driver_license, password, avatar, id}:ICreateUserDTO): Promise<void> {
		const user = this.repository.create({
			name,
			password,
			email,
			driver_license,
			avatar, 
			id
		});
		await this.repository.save(user);
	}
	async findByEmail(email:string): Promise<User> {
		const user = await this.repository.findOne({where: {email}});
		return user;
	}
	async findById(id: string): Promise<User> {
		const user = await this.repository.findOne(id);
		return user;
	}


}

export {UsersRepository};