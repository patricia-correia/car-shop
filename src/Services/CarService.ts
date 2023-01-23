import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import { ICarODM } from '../Models/CarODM';

const MESSAGE_422 = 'Invalid mongo id';
const MESSAGE_404 = 'Car not found';

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

  private isValidID(id: string): boolean {
    const idRegex = /^[a-f\d]{24}$/i;
    return idRegex.test(id);
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

  public async find() {
    const showList = await this.carODM.find();
    const arrayList = showList.map((car) => this.createCarDomain(car));
    return arrayList;
  }

  public async findById(id: string) {
    if (!this.isValidID(id)) {
      return { status: 422, message: MESSAGE_422 };
    }

    const car = await this.carODM.findById(id);
    if (car) {
      return { status: 200, message: this.createCarDomain(car) };
    }
    return { status: 404, message: MESSAGE_404 };
  }

  public async update(id: string, carObject: ICar) {
    if (!this.isValidID(id)) return { status: 422, message: MESSAGE_422 };

    const updateCar = await this.carODM.findById(id);
    const carUpdate = this.createCarDomain(updateCar);

    if (carUpdate) {
      await this.carODM.update(id, carObject);
      return { status: 200, message: { id, ...carObject } };
    }
    return { status: 404, message: MESSAGE_404 };
  }
}

export default CarService;