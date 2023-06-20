import { Router } from 'express';
import { categoriesRoutes } from './categories.routes';
import { specificationRoutes } from './specification.routes';
import { usersRoutes } from './users.routes';
import { authenticateRoutes } from './authenticate.routes';
import { carsRouters } from './cars.routes';
import { rentalRoutes } from './rental.routes';
import { passwordRoutes } from './password.routes';

const router = Router();
router.use('/categories',categoriesRoutes);
router.use('/specifications', specificationRoutes);
router.use('/users', usersRoutes);
router.use('/cars',  carsRouters);
router.use('/rentals', rentalRoutes);
router.use('/password', passwordRoutes);
router.use(authenticateRoutes);




export {router};