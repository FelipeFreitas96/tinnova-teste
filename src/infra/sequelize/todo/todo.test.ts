import SequelizeHelper from '../helpers/sequelize-helper';
import { SequelizeTodoDbAdapter } from './todo';

describe('Sequelize Todo Db Adapter', () => {
    let sut: SequelizeTodoDbAdapter;
    beforeAll(async () => {
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
    test('Deveria retornar o Todo caso os dados estiverem válidos', async () => {
        sut = new SequelizeTodoDbAdapter();
        const response = await sut.add({ description: 'any_description' });
        expect(response).toBeTruthy();
        expect(response.description).toBe('any_description');
    });
    test('Deveria retornar o Todo criado se os dados estiverem válidos', async () => {
        sut = new SequelizeTodoDbAdapter();
        const response = await sut.get(1);
        expect(response).toBeTruthy();
        expect(response.description).toBe('any_description');
    });
    test('Deveria retornar uma lista de 1 Todo', async () => {
        sut = new SequelizeTodoDbAdapter();
        const response = await sut.list();
        expect(response).toBeTruthy();
        expect(response).toHaveLength(1);
    });
    test('Deveria editar a descrição do Todo criado', async () => {
        sut = new SequelizeTodoDbAdapter();
        const response = await sut.update({ id: 1, description: 'new_description' });
        expect(response).toBeTruthy();
        expect(response.description).toBe('new_description');
    });
    test('Deveria deletar o Todo criado', async () => {
        sut = new SequelizeTodoDbAdapter();
        const response = await sut.delete({ id: 1 });
        expect(response).toBeTruthy();
        expect(response.hidden).toBe(true);
    });
}); 