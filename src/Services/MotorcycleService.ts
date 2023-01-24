import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

const MESSAGE_422 = 'Invalid mongo id';
const MESSAGE_404 = 'Motorcycle not found';

class MotorcycleService {
  constructor(
    private motorcycleODM: MotorcycleODM,
  ) {}

  private isValidID(id: string): boolean {
    const idRegex = /^[a-f\d]{24}$/i;
    return idRegex.test(id);
  }

  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async create(motorcycle: IMotorcycle) {
    if (motorcycle.status === undefined) {
      const newMotorcycle = await this.motorcycleODM.create({
        ...motorcycle,
        status: false,
      });
      return this.createMotorcycleDomain(newMotorcycle);
    }
    const newMotorcycle = await this.motorcycleODM.create(motorcycle);
    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async find() {
    const showList = await this.motorcycleODM.find();
    const arrayList = showList.map((motorcycle) => this.createMotorcycleDomain(motorcycle));
    return arrayList;
  }

  public async findById(id: string) {
    if (!this.isValidID(id)) {
      return { status: 422, message: MESSAGE_422 };
    }

    const motorcycle = await this.motorcycleODM.findById(id);
    if (motorcycle) {
      return { status: 200, message: this.createMotorcycleDomain(motorcycle) };
    }
    return { status: 404, message: MESSAGE_404 };
  }
}

export default MotorcycleService;