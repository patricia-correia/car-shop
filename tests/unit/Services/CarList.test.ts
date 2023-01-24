import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Car from '../../../src/Domains/Car';
import CarODM from '../../../src/Models/CarODM';
import CarService from '../../../src/Services/CarService';

const inputArray = [
  {
    id: '63cfc8758e22e4884d1bc0ce',
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.99,
    doorsQty: 4,
    seatsQty: 5,
  },
  {
    id: '63cfcc6e8e22e4884d1bc0d0',
    model: 'Tempra',
    year: 1995,
    color: 'Black',
    status: false,
    buyValue: 39,
    doorsQty: 2,
    seatsQty: 5,
  },
];

describe('Deve listar os carros', function () {
  it('Deve listar todos os carros cadastrados', async function () {
    const carOutput = inputArray.map((car) => new Car(car));

    sinon.stub(Model, 'find').resolves(carOutput);

    const service = new CarService(new CarODM());
    const result = await service.find();

    expect(result).to.be.deep.equal(carOutput);

    sinon.restore();
  });

  it('Deve retornar o carro de acordo com o id', async function () {
    const carOutput: Car = new Car(inputArray[0]);

    sinon.stub(Model, 'findById').resolves(carOutput);

    const service = new CarService(new CarODM());
    const result = await service.findById('63cfc8758e22e4884d1bc0ce');

    expect(result.message).to.be.deep.equal(carOutput);

    sinon.restore();
  });
});