import { Schema } from 'mongoose';
import IMotorcicle from '../Interfaces/IMotorcycle';
import AbstractODM from './AbstractODM';

class MotorcycleODM extends AbstractODM<IMotorcicle> {
  constructor() {
    const schema = new Schema<IMotorcicle>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, reuired: true },
    });
    super(schema, 'Motorcycle');
  }

  public async find(): Promise<IMotorcicle[]> {
    return this.model.find();
  }

  public async findById(id: string): Promise<IMotorcicle | null> {
    return this.model.findById(id);
  }
}

export default MotorcycleODM;