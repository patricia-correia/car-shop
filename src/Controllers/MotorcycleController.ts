import { NextFunction, Request, Response } from 'express';
import MotorcycleODM from '../Models/MotorcycleODM';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService(new MotorcycleODM());
  }

  public async create() {
    try {
      const newMotorcycle = await this.service.create(this.req.body);
      return this.res.status(201).json(newMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async find() {
    try {
      const motorcycleList = await this.service.find();
      return this.res.status(200).json(motorcycleList);
    } catch (error) {
      this.next(error);
    }
  }

  public async findById() {
    try {
      const { status, message } = await this.service.findById(this.req.params.id);
      if (status !== 200) {
        return this.res.status(status).json({ message });
      }
      return this.res.status(status).json(message);
    } catch (error) {
      this.next(error);
    }
  }
}

export default MotorcycleController;