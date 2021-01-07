import { VehicleController } from './vehicle-controller';
import { AddVehicleModel, DeleteVehicleModel, Vehicle, UpdateVehicleModel } from '../../domain/usecases/vehicle';
import { VehicleModel } from '../../domain/models/vehicle';
import { HttpMethod, HttpRequest } from '../protocols/http';
import { BrandValidator } from '../protocols/brand-validator';
import { DbVehicle } from '../../data/usecases/db-vehicle/db-vehicle';
import { VehicleDbAdapter } from '../../data/protocols/vehicle-db-adapter';

const makeSut = () => {
    class BrandValidatorStub implements BrandValidator {
        isValid() {
            return true;
        }
    }
    
    class SequelizeVehicleDbAdapterStub implements VehicleDbAdapter {
        truncate(deleteVehicleModel: DeleteVehicleModel): Promise<void> {
            throw new Error('Method not implemented.');
        }
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

        list(): Promise<Array<VehicleModel>> {
            return Promise.resolve([this.mockArray, this.mockArray]);
        }
        get(todoId: number): Promise<VehicleModel> {
            return Promise.resolve(this.mockArray);
        }
        add(addVehicleModel: AddVehicleModel): Promise<VehicleModel> {
            return Promise.resolve(this.mockArray);
        }
        update(updateVehicleModel: UpdateVehicleModel): Promise<VehicleModel> {
            return Promise.resolve(this.mockArray);
        }
        delete(deleteVehicleModel: DeleteVehicleModel): Promise<VehicleModel> {
            return Promise.resolve({ ...this.mockArray, hidden: true });
        }
    }

    const vehicleDbAdapter = new SequelizeVehicleDbAdapterStub();
    const vehicleStub = new DbVehicle(vehicleDbAdapter);
    const brandStub = new BrandValidatorStub();
    const sut = new VehicleController(brandStub, vehicleStub);
    return { sut, vehicleStub, brandStub };
}

describe('Vehicle-Controller', () => {
    test('Deveria falhar ao tentar dar um request com metodo inválido', async () => {
        const { sut } = makeSut();
        jest.spyOn(sut, 'handle').mockRejectedValue(new Error());
        await expect(sut.handle('ANY_METHOD' as HttpMethod, {})).rejects.toThrow();
    });
    
    // Criar um Vehicle
    test('Deveria falhar ao tentar dar um request com metodo inválido', async () => {
        const { sut } = makeSut();
        jest.spyOn(sut, 'handle').mockRejectedValue(new Error());
        await expect(sut.handle('ANY_METHOD' as HttpMethod, {})).rejects.toThrow();
    });
    
    test('Deveria retornar o statusCode 400 ao tentar criar Vehicle inválido', async () => {
        const { sut } = makeSut();
        const request = {
            body: {},
        };

        const response = await sut.handle('POST', request);
        expect(response.statusCode).toBe(400);
    });

    test('Deveria retornar o statusCode 400 ao tentar criar Vehicle sem vehicle', async () => {
        const { sut } = makeSut();        
        const request = {
            body: {
                brand: 'any_brand',
                year: -1,
                description: 'any_description',
                sold: false,
            },
        };

        const response = await sut.handle('POST', request);
        expect(response.statusCode).toBe(400);
    });

    test('Deveria retornar o statusCode 400 ao tentar criar Vehicle sem marca', async () => {
        const { sut } = makeSut();        
        const request = {
            body: {
                vehicle: 'any_vehicle',
                year: -1,
                description: 'any_description',
                sold: false,
            },
        };

        const response = await sut.handle('POST', request);
        expect(response.statusCode).toBe(400);
    });
    
    test('Deveria retornar o statusCode 400 ao tentar criar Vehicle sem ano', async () => {
        const { sut } = makeSut();
        const request = {
            body: {
                vehicle: 'any_vehicle',
                brand: 'any_brand',
                description: 'any_description',
                sold: false,
            },
        };

        const response = await sut.handle('POST', request);
        expect(response.statusCode).toBe(400);
    });

    test('Deveria retornar o statusCode 400 ao tentar criar Vehicle sem descrição', async () => {
        const { sut } = makeSut();
        const request = {
            body: {
                vehicle: 'any_vehicle',
                brand: 'any_brand',
                year: -1,
                sold: false,
            },
        };

        const response = await sut.handle('POST', request);
        expect(response.statusCode).toBe(400);
    });

    test('Deveria retornar o statusCode 400 ao tentar criar Vehicle sem vendido', async () => {
        const { sut } = makeSut();
        const request = {
            body: {
                vehicle: 'any_vehicle',
                brand: 'any_brand',
                year: -1,
                description: 'any_description',
            },
        };

        const response = await sut.handle('POST', request);
        expect(response.statusCode).toBe(400);
    });

    test('Deveria retornar o statusCode 400 ao criar Vehicle com marca inválida', async () => {
        const { sut, brandStub } = makeSut();
        jest.spyOn(brandStub, 'isValid').mockReturnValue(false);

        const request = {
            body: {
                vehicle: 'any_vehicle',
                brand: 'invalid_brand',
                year: -1,
                description: 'any_description',
                sold: false,
            },
        };

        const response = await sut.handle('POST', request);
        expect(response.statusCode).toBe(400);
    });

    test('Deveria retornar o statusCode 200 ao criar Vehicle válido', async () => {
        const { sut } = makeSut();
        const request = {
            body: {
                vehicle: 'any_vehicle',
                brand: 'any_brand',
                year: -1,
                description: 'any_description',
                sold: false,
            },
        };

        const response = await sut.handle('POST', request);
        expect(response.statusCode).toBe(200);
    });

    test('Deveria retornar o statusCode 200 ao criar um Vehicle se os parametros estiverem válidos', async () => {
        const { sut, vehicleStub } = makeSut();
        const addSpy = jest.spyOn(vehicleStub, 'add');
        const request = {
            body: {
                vehicle: 'any_vehicle',
                brand: 'any_brand',
                year: -1,
                description: 'any_description',
                sold: false,
            },
        };

        await sut.handle('POST', request);
        expect(addSpy).toHaveBeenCalledWith({
            vehicle: 'any_vehicle',
            brand: 'any_brand',
            year: -1,
            description: 'any_description',
            sold: false,
        });
    });

    // Editar um Vehicle
    test('Deveria retornar o statusCode 400 ao tentar editar um Vehicle inválido', async () => {
        const { sut } = makeSut();
        const request = {
            body: { },
        };

        const response = await sut.handle('PUT', request);
        expect(response.statusCode).toBe(400);
    });

    test('Deveria retornar o statusCode 400 ao tentar editar um Vehicle sem id', async () => {
        const { sut } = makeSut();
        const request = {
            body: {
                vehicle: 'any_vehicle',
                brand: 'any_brand',
                year: -1,
                description: 'any_description',
                sold: false,
            },
        };

        const response = await sut.handle('PUT', request);
        expect(response.statusCode).toBe(400);
    });
    
    test('Deveria retornar o statusCode 404 ao tentar editar um Vehicle com id não existente', async () => {
        const { sut, vehicleStub } = makeSut();
        jest.spyOn(vehicleStub, 'get').mockResolvedValue(false as unknown as VehicleModel);

        const request = {
            body: {
                id: -1,
                vehicle: 'any_vehicle',
                brand: 'any_brand',
                year: -1,
                description: 'any_description',
                sold: false,
            },
        };

        const response = await sut.handle('PUT', request);
        expect(response.statusCode).toBe(404);
    });

    test('Deveria retornar o statusCode 400 ao tentar editar um Vehicle sem parâmetros o suficiente', async () => {
        const { sut } = makeSut();        
        const request = {
            body: {
                id: -1,
            },
        };

        const response = await sut.handle('PUT', request);
        expect(response.statusCode).toBe(400);
    });
    test('Deveria retornar o statusCode 400 ao tentar editar um Vehicle com marca inválida', async () => {
        const { sut, brandStub } = makeSut();
        jest.spyOn(brandStub, 'isValid').mockReturnValue(false);

        const request = {
            body: {
                id: -1,
                vehicle: 'any_vehicle',
                brand: 'invalid_brand',
                year: -1,
                description: 'any_description',
                sold: false,
            },
        };

        const response = await sut.handle('PUT', request);
        expect(response.statusCode).toBe(400);
    });

    test('Deveria retornar o statusCode 200 ao tentar editar um Vehicle válido', async () => {
        const { sut } = makeSut();
        const request = {
            body: {
                id: -1,
                vehicle: 'any_vehicle',
                brand: 'any_brand',
                year: -1,
                description: 'any_description',
                sold: false,
            },
        };

        const response = await sut.handle('PUT', request);
        expect(response.body).toBeTruthy();
        expect(response.body.vehicle).toBe('any_vehicle');
        expect(response.body.brand).toBe('any_brand');
        expect(response.body.year).toBe(-1);
        expect(response.body.description).toBe('any_description');
        expect(response.body.sold).toBe(false);
        expect(response.statusCode).toBe(200);
    });
    
    test('Deveria retornar o statusCode 200 ao editar um Vehicle se os parametros estiverem válidos', async () => {
        const { sut, vehicleStub } = makeSut();
        const updateSpy = jest.spyOn(vehicleStub, 'update');
        const request = {
            body: {
                id: -1,
                vehicle: 'any_vehicle',
                brand: 'any_brand',
                year: -1,
                description: 'any_description',
                sold: false,
            },
        };

        await sut.handle('PUT', request);
        expect(updateSpy).toHaveBeenCalledWith({ 
            id: -1,
            vehicle: 'any_vehicle',
            brand: 'any_brand',
            year: -1,
            description: 'any_description',
            sold: false,
        });
    });

    // Deletar um Vehicle
    test('Deveria retornar o statusCode 400 ao tentar deletar um Vehicle com parâmetro inválido', async () => {
        const { sut } = makeSut();
        const request = {
            params: { },
        };

        const response = await sut.handle('DELETE', request);
        expect(response.statusCode).toBe(400);
    });

    test('Deveria retornar o statusCode 404 ao tentar deletar um Vehicle que não existe', async () => {
        const { sut, vehicleStub } = makeSut();      
        jest.spyOn(vehicleStub, 'get').mockResolvedValue(false as unknown as VehicleModel);

        const request = {
            params: {
                id: -1,
            },
        };

        const response = await sut.handle('DELETE', request);
        expect(response.statusCode).toBe(404);
    });

    test('Deveria retornar o statusCode 200 ao tentar deletar um Vehicle válido', async () => {
        const { sut } = makeSut();
        const request = {
            params: {
                id: -1,
            },
        };

        const response = await sut.handle('DELETE', request);
        expect(response.statusCode).toBe(200);
    });
    
    test('Deveria retornar o statusCode 200 ao deletar um Vehicle se os parametros estiverem válidos', async () => {
        const { sut, vehicleStub } = makeSut();
        const deleteSpy = jest.spyOn(vehicleStub, 'delete');
        const request = {
            params: {
                id: -1,
            },
        };

        await sut.handle('DELETE', request);
        expect(deleteSpy).toHaveBeenCalledWith({ id: -1 });
    });

    // Mostrar Vehicles
    test('Deveria retornar o statusCode 404 ao mostrar um Vehicle inválido', async () => {
        const { sut, vehicleStub } = makeSut();
        jest.spyOn(vehicleStub, 'get').mockResolvedValue(false as unknown as VehicleModel);

        const request = {
            params: {
                id: -1,
            },
        };

        const response = await sut.handle('GET', request);
        expect(response.statusCode).toBe(404);
    });
    
    test('Deveria retornar o statusCode 200 ao mostrar um Vehicle válido', async () => {
        const { sut } = makeSut();
        const request = {
            params: { id: -1 },
        };

        const response = await sut.handle('GET', request);
        expect(response.statusCode).toBe(200);
    });

    test('Deveria retornar o statusCode 200 ao mostrar um Vehicle se os parametros estiverem válidos', async () => {
        const { sut, vehicleStub } = makeSut();
        const getSpy = jest.spyOn(vehicleStub, 'get');

        const request = {
            params: { id: -1 },
        };

        await sut.handle('GET', request);
        expect(getSpy).toHaveBeenCalledWith(-1);
    });
    
    // Listar Vehicles
    test('Deveria retornar o statusCode 200 ao listar todos os Vehicles', async () => {
        const { sut, vehicleStub } = makeSut();
        const listSpy = jest.spyOn(vehicleStub, 'list');
        const request = {
            body: { },
        };

        const response = await sut.handle('GET', request);
        expect(listSpy).toHaveBeenCalledWith();
        expect(response.body).toHaveLength(2);
        expect(response.statusCode).toBe(200);
    });

    // Metodo inválido
    test('Deveria retornar o statusCode 405 ao tentar usar um metodo inválido', async () => {
        const { sut } = makeSut();
        const request = {
            body: { },
        };

        const response = await sut.handle('INVALID_METHOD' as HttpMethod, request);
        expect(response.statusCode).toBe(405);
    });
});