import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleODM from '../../../src/Models/MotorcycleODM';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('Deve criar a lista de motos', function () {
  it('Deve criar a lista de motos com sucesso', async function () {
    const motorcycleInput = {
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30,
      category: 'Street',
      engineCapacity: 600,
    };

    const motorcycleOutput: Motorcycle = new Motorcycle({
      id: '63cfd1438e22e4884d1bc0d3',
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30,
      category: 'Street',
      engineCapacity: 600,
    });
    sinon.stub(Model, 'create').resolves(motorcycleOutput);

    const service = new MotorcycleService(new MotorcycleODM());
    const result = await service.create(motorcycleInput);

    expect(result).to.be.deep.equal(motorcycleOutput);

    sinon.restore();
  });
});
