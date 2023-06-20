import { hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';
import createConnection  from '../index';




async function create(){
	const connection = createConnection();
	const id = uuid();
	const password = await hash('admin',10);

	await (await connection).query(
		`INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) 
    values ('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', '12309303') `
	);
	(await connection).close();
}

create().then(()=> console.log('User admin created'));
