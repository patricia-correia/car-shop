import { NextFunction, Request, Response } from 'express';
import CarODM from '../Models/CarODM';
import CarService from '../Services/CarService';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService(new CarODM());
  }

  public async create() {
    try {
      const newCar = await this.service.create(this.req.body);
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async find() {
    try {
      const carList = await this.service.find();
      return this.res.status(200).json(carList);
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

  public async update() {
    try {
      const { status, message } = await this.service
        .update(this.req.params.id, this.req.body);
      if (status !== 200) {
        return this.res.status(status).json({ message });
      }
      return this.res.status(status).json(message);
    } catch (error) {
      this.next(error);
    }
  }
}

export default CarController;