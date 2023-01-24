import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

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
}

export default MotorcycleService;