import 'reflect-metadata';
import 'dotenv/config';
import '../../container/index';

import express, { Request, Response, NextFunction} from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../../swagger.json';
import { router } from './routes';
import { AppError } from '../../errors/AppError';
import createConnetion from '../typeorm/index';

createConnetion();


const app = express();
app.use(express.json());

app.use(router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use((err: Error, request:Request, response:Response, next:NextFunction)=> {
	if(err instanceof AppError){
		return response.status(err.statusCode).json({message: err.message});
	}
	return response.status(500).json({status: 'error', message: `Internal server error - ${err.message} `});
	next();
}); 

export {app};