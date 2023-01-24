import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Car from '../../../src/Domains/Car';
import CarODM from '../../../src/Models/CarODM';
import CarService from '../../../src/Services/CarService';

describe('Deve criar a lista de carros', function () {
  it('Deve criar a lista de carros com sucesso', async function () {
    const carInput = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };

    const carOutput: Car = new Car({
      id: '63cfc8758e22e4884d1bc0ce',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    });
    sinon.stub(Model, 'create').resolves(carOutput);

    const service = new CarService(new CarODM());
    const result = await service.create(carInput);

    expect(result).to.be.deep.equal(carOutput);

    sinon.restore();
  });
});
