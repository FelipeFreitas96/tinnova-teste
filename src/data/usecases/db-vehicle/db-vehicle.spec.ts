import { DbVehicle } from "./db-vehicle";
import { VehicleDbAdapter } from '../../protocols/vehicle-db-adapter';
import { VehicleModel } from "../../../domain/models/vehicle";
import { AddVehicleModel, UpdateVehicleModel, DeleteVehicleModel } from "../../../domain/usecases/vehicle";

const makeVehicleDbAdapter = () => {
    class VehicleDbAdapterStub implements VehicleDbAdapter {
        private readonly mockArray = {
            id: -1,
            vehicle: 'any_vehicle',
            brand: 'any_brand',
            year: -1,
            description: 'any_description',
            sold: false,
            hidden: false,
            createdAt: -1,
            updatedAt: -1,
        };

        truncate(): Promise<void> {
            return Promise.resolve();
        }
        list(): Promise<Array<VehicleModel>> {
            return Promise.resolve([
                this.mockArray,
                this.mockArray,
                {
                    ...this.mockArray,
                    hidden: true,
                },
            ]);
        }
        get(vehicleId: number): Promise<VehicleModel> {
            return Promise.resolve(this.mockArray);
        }
        add(addVehicleModel: AddVehicleModel): Promise<VehicleModel> {
            return Promise.resolve(this.mockArray);
        }
        update(updateVehicleModel: UpdateVehicleModel): Promise<VehicleModel> {
            return Promise.resolve({ ...this.mockArray, description: 'new_description' });
        }
        delete(deleteVehicleModel: DeleteVehicleModel): Promise<VehicleModel> {
            return Promise.resolve({ ...this.mockArray, hidden: true });
        }
    }
    return new VehicleDbAdapterStub();
}

const makeSut = () => {
    const vehicleDbAdapter = makeVehicleDbAdapter();
    const sut = new DbVehicle(vehicleDbAdapter);
    return { sut, vehicleDbAdapter };
}

describe('DbVehicle Usecases', () => {
    // Criar um Vehicle
    test('Deveria criar um Vehicle quando todos os parâmetros estivessem corretos', async () => {
        const { sut } = makeSut();
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

    test('Deveria dar erro ao criar um Vehicle quando tivesse uma excessão', async () => {
        const { sut } = makeSut();
        jest.spyOn(sut, 'add').mockRejectedValue(new Error());

        const response = sut.add({ });
        await expect(response).rejects.toThrow();
    });

    test('Deveria dar erro ao criar no banco um Vehicle quando tivesse uma excessão', async () => {
        const { sut, vehicleDbAdapter } = makeSut();
        jest.spyOn(vehicleDbAdapter, 'add').mockRejectedValue(new Error());

        const response = sut.add({
            vehicle: 'any_vehicle',
            brand: 'any_brand',
            year: -1,
            description: 'any_description',
            sold: false,
        });

        await expect(response).rejects.toThrow();
    });

    // Editar um Vehicle
    test('Deveria editar um Vehicle quando tiver no minimo dois parâmetros', async () => {
        const { sut } = makeSut();
        const response = await sut.update({ id: -1, description: 'any_description' });
        expect(response).toBeTruthy();
        expect(response.id).toBe(-1);
        expect(response.description).toBe('new_description');
    });

    test('Deveria dar erro ao editar um Vehicle quando tivesse uma excessão', async () => {
        const { sut } = makeSut();
        jest.spyOn(sut, 'update').mockRejectedValue(new Error());

        const response = sut.update({ });
        await expect(response).rejects.toThrow();
    });

    // Deletar um Vehicle
    test('Deveria deletar um Vehicle quanto todos os parâmetros estivessem corretos', async () => {
        const { sut } = makeSut();
        const response = await sut.delete({ id: -1 });
        expect(response.hidden).toBe(true);
    });
    
    test('Deveria dar erro ao deletar um Vehicle quando tivesse uma excessão', async () => {
        const { sut } = makeSut();
        jest.spyOn(sut, 'delete').mockRejectedValue(new Error());

        const response = sut.delete({ });
        await expect(response).rejects.toThrow();
    });

    // Listar Vehicles
    test('Deveria listar todos os Vehicles válidos', async () => {
        const { sut } = makeSut();
        const response = await sut.list();
        expect(response).toBeTruthy();
    });

    test('Deveria listar Vehicles vázio', async () => {
        const { sut, vehicleDbAdapter } = makeSut();
        jest.spyOn(vehicleDbAdapter, 'list').mockResolvedValue([]);
        const response = await sut.list();
        expect(response).toStrictEqual([]);
    });
    
    // Mostrar Vehicles
    test('Deveria mostrar Vehicle com um id válido', async () => {
        const { sut } = makeSut();
        const response = await sut.get(-1);
        expect(response).toBeTruthy();
        expect(response.id).toBe(-1);
        expect(response.vehicle).toBe('any_vehicle');
        expect(response.brand).toBe('any_brand');
        expect(response.year).toBe(-1);
        expect(response.description).toBe('any_description');
        expect(response.sold).toBe(false);
        expect(response.hidden).toBe(false);
        expect(response.createdAt).toBe(-1);
        expect(response.updatedAt).toBe(-1);
    });
    test('Deveria dar erro ao mostrar um Vehicle quando tivesse uma excessão', async () => {
        const { sut } = makeSut();
        jest.spyOn(sut, 'get').mockRejectedValue(new Error());

        const response = sut.get(-1);
        await expect(response).rejects.toThrow();
    });
});