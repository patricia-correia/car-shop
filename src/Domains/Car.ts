import ICar from '../Interfaces/ICar';
import Vehicle from './Vehicle';

class Car extends Vehicle {
  private doorsQty: number;
  private seatsQty: number;

  constructor({ id, model, year, color, status, buyValue, doorsQty, seatsQty } : ICar) {
    super({ id, model, year, color, buyValue, status });
    this.doorsQty = doorsQty;
    this.seatsQty = seatsQty;
  }
}

export default Car;