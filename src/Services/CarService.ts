import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import { ICarODM } from '../Models/CarODM';

class CarService {
  constructor(
    private carODM: ICarODM,
  ) {}

  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async create(car: ICar) {
    if (car.status === undefined) {
      const newCar = await this.carODM.create({
        ...car,
        status: false,
      });
      return this.createCarDomain(newCar);
    }
    const newCar = await this.carODM.create(car);
    return this.createCarDomain(newCar);
  }
}

export default CarService;