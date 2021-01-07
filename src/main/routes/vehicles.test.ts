import request from 'supertest';
import SequelizeHelper from '../../infra/sequelize/helpers/sequelize-helper';
import { SequelizeVehicleDbAdapter } from '../../infra/sequelize/vehicle/vehicle';
import app from '../config';

describe('Vehicles Route', () => {
    let sut: SequelizeVehicleDbAdapter;
    beforeAll(async () => {
        await SequelizeHelper.connect('127.0.0.1');
    });
    afterAll(async () => {
        await sut.truncate();
        await SequelizeHelper.disconnect();
    });
    test('Deveria válidar a conexão com o banco', async () => {
        const connection = SequelizeHelper.getConnection();
        expect(connection).not.toBe(undefined);
    });
    test('Deveria retornar todos Vehicles caso retornasse erro 200', async () => {
        const response = await request(app)
            .get('/v1/vehicles');
            
        expect(response.status).toBe(200);
    });
});