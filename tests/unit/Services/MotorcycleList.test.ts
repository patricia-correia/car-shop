import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleODM from '../../../src/Models/MotorcycleODM';
import MotorcycleService from '../../../src/Services/MotorcycleService';

const inputArray = [
  {
    id: '63cfd1438e22e4884d1bc0d3',
    model: 'Honda Cb 600f Hornet',
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30,
    category: 'Street',
    engineCapacity: 600,
  },
  {
    id: '63cfd2d68e22e4884d1bc0d6',
    model: 'Honda Cbr 1000rr',
    year: 2011,
    color: 'Orange',
    status: true,
    buyValue: 59.9,
    category: 'Street',
    engineCapacity: 1000,
  },
];

describe('Deve listar os motos', function () {
  it('Deve listar todos os motos cadastrados', async function () {
    const motorcycleOutput = inputArray.map((motorcycle) => new Motorcycle(motorcycle));

    sinon.stub(Model, 'find').resolves(motorcycleOutput);

    const service = new MotorcycleService(new MotorcycleODM());
    const result = await service.find();

    expect(result).to.be.deep.equal(motorcycleOutput);

    sinon.restore();
  });
  it('Deve retornar o motos de acordo com o id', async function () {
    const motorcycleOutput: Motorcycle = new Motorcycle(inputArray[0]);

    sinon.stub(Model, 'findById').resolves(motorcycleOutput);

    const service = new MotorcycleService(new MotorcycleODM());
    const result = await service.findById('63cfd1438e22e4884d1bc0d3');

    expect(result.message).to.be.deep.equal(motorcycleOutput);

    sinon.restore();
  });
});