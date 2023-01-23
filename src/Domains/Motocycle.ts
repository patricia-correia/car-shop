import IMotorcicle from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

class Motocycle extends Vehicle {
  private category: string;
  private engineCapacity: number;

  constructor({
    id, model, year, color, status, buyValue, category, engineCapacity,
  }: IMotorcicle) {
    super({ id, model, year, color, status, buyValue });
    this.category = category;
    this.engineCapacity = engineCapacity;
  }
}

export default Motocycle;