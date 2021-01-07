import SequelizeHelper from '../helpers/sequelize-helper';
import { SequelizeVehicleDbAdapter } from './vehicle';

describe('Sequelize Vehicle Db Adapter', () => {
    let sut: SequelizeVehicleDbAdapter;
    beforeAll(async () => {
        sut = new SequelizeVehicleDbAdapter();
        await SequelizeHelper.connect();
    });
    afterAll(async () => {
        await sut.truncate();
        await SequelizeHelper.disconnect();
    });
    test('Deveria válidar a conexão com o banco', async () => {
        const connection = SequelizeHelper.getConnection();
        expect(connection).not.toBe(undefined);
    });
    test('Deveria retornar uma lista vazia de Vehicles', async () => {
        const response = await sut.list();
        expect(response).toBeTruthy();
        expect(response).toHaveLength(0);
    });
    test('Deveria criar um Vehicle caso os dados estiverem válidos', async () => {
        const response = await sut.add({
            vehicle: 'any_vehicle',
            brand: 'any_brand',
            year: -1,
            description: 'any_description',
            sold: false,
        });
        expect(response).toBeTruthy();
        expect(response.brand).toBe('any_brand');
        expect(response.year).toBe(-1);
        expect(response.description).toBe('any_description');
        expect(response.sold).toBe(false);
    });
    test('Deveria retornar o Vehicle criado se os dados estiverem válidos', async () => {
        const response = await sut.get(1);
        expect(response).toBeTruthy();
        expect(response.brand).toBe('any_brand');
        expect(response.year).toBe(-1);
        expect(response.description).toBe('any_description');
        expect(response.sold).toBe(false);
    });
    test('Deveria retornar uma lista de 1 Vehicle', async () => {
        const response = await sut.list();
        expect(response).toBeTruthy();
        expect(response).toHaveLength(1);
    });
    test('Deveria editar a marca do Vehicle criado', async () => {
        const response = await sut.update({
            id: 1,
            brand: 'new_brand',
        });
        expect(response).toBeTruthy();
        expect(response.brand).toBe('new_brand');
    });
    test('Deveria editar o ano do Vehicle criado', async () => {
        const response = await sut.update({
            id: 1,
            year: -2,
        });
        expect(response).toBeTruthy();
        expect(response.year).toBe(-2);
    });
    test('Deveria editar o descrição do Vehicle criado', async () => {
        const response = await sut.update({
            id: 1,
            description: 'new_description',
        });
        expect(response).toBeTruthy();
        expect(response.description).toBe('new_description');
    });
    test('Deveria editar o vendido do Vehicle criado', async () => {
        const response = await sut.update({
            id: 1,
            sold: true,
        });
        expect(response).toBeTruthy();
        expect(response.sold).toBe(true);
    });
    test('Deveria deletar o Vehicle criado', async () => {
        const response = await sut.delete({ id: 1 });
        expect(response).toBeTruthy();
        expect(response.hidden).toBe(true);
    });
}); 