import { CarImage } from '../infra/typeorm/entities/CarImage';

interface IcarsImageRepository{
  create(car_id:string, image_name_string):Promise<CarImage>
}


export {IcarsImageRepository};