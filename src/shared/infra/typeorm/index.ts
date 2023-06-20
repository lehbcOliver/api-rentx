import {Connection, createConnection, getConnectionOptions} from 'typeorm';

export default async():Promise<Connection> => {
	const defaultOption = await getConnectionOptions();
	return createConnection(
		Object.assign(defaultOption, {
			host: '192.168.0.113',
			database: process.env.NODE_ENV === 'test' ? 'rentx_test' : defaultOption.database
		})
	);
};