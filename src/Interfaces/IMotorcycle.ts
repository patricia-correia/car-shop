import IVehicle from './IVehicle';

interface IMotorcicle extends IVehicle{
  category: string,
  engineCapacity: number,
}

export default IMotorcicle;