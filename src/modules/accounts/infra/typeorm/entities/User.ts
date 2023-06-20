/* eslint-disable no-mixed-spaces-and-tabs */
import { v4 as uuid } from 'uuid';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
class User {
  @PrimaryColumn()
	  id:string;
  @Column()
  	name:string;
  @Column()
  	email:string;
  @Column()
  	password:string;
  @Column()
  	driver_license:string;
  @Column()
  	isAdmin:string;
	@Column()
		avatar:string;
  @CreateDateColumn()
  	created_at:string;

  constructor(){
  	if(!this.id){
  		this.id = uuid();
  	}
  }
}


export {User};