import {Router} from 'express';
import { CreateCarController } from '../../../../modules/cars/useCases/CreateCar/CreateCarController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ListAvailableController } from '../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { CreateCarSpecificationController } from '../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { UploadImageCarController } from '../../../../modules/cars/useCases/uploadCarImage/UploadImageCarController';
import multer from 'multer';
import upload from '../../../../config/upload';


const carsRouters = Router();

const uploadImages = multer(upload);

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadImageCarController = new UploadImageCarController();

carsRouters.post('/', ensureAuthenticated, ensureAdmin, createCarController.hanle);
carsRouters.get('/available', listAvailableCarsController.handle);
carsRouters.post('/specifications/:id', ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle);
carsRouters.post('/images/:id',ensureAuthenticated, ensureAdmin,uploadImages.array('images'), uploadImageCarController.handle);

export {carsRouters};