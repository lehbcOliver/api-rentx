import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid} from 'uuid';

@Entity('specifications')
class Specification {
	@PrimaryColumn()
		id?: string;
	@Column()
		name:string;
	@Column()
		description:string;
	@CreateDateColumn()
		create_at: Date;

	constructor(){
		if(!this.id){
			this.id = uuid();
		}
	}
}

export {Specification};