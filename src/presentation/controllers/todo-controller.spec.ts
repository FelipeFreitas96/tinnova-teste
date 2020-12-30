import { TodoController } from './todo-controller';
import { AddTodoModel, DeleteTodoModel, Todo, UpdateTodoModel } from '../../domain/usecases/todo';
import { TodoModel } from '../../domain/models/todo';
import { HttpMethod } from '../protocols/http';

const makeSut = () => {
    class TodoStub implements Todo {
        list(): Promise<Array<TodoModel>> {
            return Promise.resolve([{
                id: -1,
                description: 'any_description',
                hidden: false,
                createdAt: -1,
                updatedAt: -1,
            }, {
                id: 0,
                description: 'any_description',
                hidden: false,
                createdAt: -1,
                updatedAt: -1,
            }]);
        }
        get(todoId: number): Promise<TodoModel> {
            return Promise.resolve({
                id: todoId,
                description: 'any_description',
                hidden: false,
                createdAt: -1,
                updatedAt: -1,
            });
        }
        add(addTodoModel: AddTodoModel): Promise<TodoModel> {
            return Promise.resolve({
                id: -1,
                description: 'any_description',
                hidden: false,
                createdAt: -1,
                updatedAt: -1,
            });
        }
        update(updateTodoModel: UpdateTodoModel): Promise<TodoModel> {
            return Promise.resolve({
                id: -1,
                description: 'any_description',
                hidden: false,
                createdAt: -1,
                updatedAt: -1,
            });
        }
        delete(deleteTodoModel: DeleteTodoModel): Promise<TodoModel> {
            return Promise.resolve({
                id: -1,
                description: 'any_description',
                hidden: true,
                createdAt: -1,
                updatedAt: -1,
            });
        }
    }

    const todoStub = new TodoStub();
    const sut = new TodoController(todoStub);
    return { sut, todoStub };
}

describe('Todo-Controller', () => {
    // Criar um Todo
    test('Deveria retornar o statusCode 500 ao tentar criar Todo inválido', async () => {
        const { sut, todoStub } = makeSut();
        jest.spyOn(todoStub, 'add').mockRejectedValue(new Error());
        
        const request = {
            body: {},
        };

        const response = await sut.handle('POST', request);
        expect(response.statusCode).toBe(500);
    });

    test('Deveria retornar o statusCode 200 ao criar Todo válido', async () => {
        const { sut } = makeSut();
        const request = {
            body: {
                description: 'any_description',
            },
        };

        const response = await sut.handle('POST', request);
        expect(response.statusCode).toBe(200);
    });

    test('Deveria retornar o statusCode 200 ao criar um Todo se os parametros estiverem válidos', async () => {
        const { sut, todoStub } = makeSut();
        const addSpy = jest.spyOn(todoStub, 'add');
        const request = {
            body: {
                description: 'any_description',
            },
        };

        await sut.handle('POST', request);
        expect(addSpy).toHaveBeenCalledWith({ description: 'any_description' });
    });

    // Editar um Todo
    test('Deveria retornar o statusCode 500 ao tentar editar um Todo inválido', async () => {
        const { sut, todoStub } = makeSut();
        jest.spyOn(todoStub, 'update').mockRejectedValue(new Error());

        const request = {
            body: { },
        };

        const response = await sut.handle('PUT', request);
        expect(response.statusCode).toBe(500);
    });

    test('Deveria retornar o statusCode 500 ao tentar editar um Todo sem id', async () => {
        const { sut, todoStub } = makeSut();
        jest.spyOn(todoStub, 'update').mockRejectedValue(new Error());

        const request = {
            body: { description: 'any_description' },
        };

        const response = await sut.handle('PUT', request);
        expect(response.statusCode).toBe(500);
    });
    
    test('Deveria retornar o statusCode 500 ao tentar editar um Todo sem descrição', async () => {
        const { sut, todoStub } = makeSut();
        jest.spyOn(todoStub, 'update').mockRejectedValue(new Error());

        const request = {
            body: { id: -1 },
        };

        const response = await sut.handle('PUT', request);
        expect(response.statusCode).toBe(500);
    });

    test('Deveria retornar o statusCode 200 ao tentar editar um Todo válido', async () => {
        const { sut } = makeSut();
        const request = {
            body: {
                id: -1,
                description: 'any_description',
            },
        };

        const response = await sut.handle('PUT', request);
        expect(response.body).toBeTruthy();
        expect(response.body.description).toBe('any_description');
        expect(response.statusCode).toBe(200);
    });
    
    test('Deveria retornar o statusCode 200 ao editar um Todo se os parametros estiverem válidos', async () => {
        const { sut, todoStub } = makeSut();
        const updateSpy = jest.spyOn(todoStub, 'update');
        const request = {
            body: {
                id: -1,
                description: 'any_description',
            },
        };

        await sut.handle('PUT', request);
        expect(updateSpy).toHaveBeenCalledWith({ id: -1, description: 'any_description' });
    });

    // Deletar um Todo
    test('Deveria retornar o statusCode 500 ao tentar deletar um Todo inválido', async () => {
        const { sut, todoStub } = makeSut();
        jest.spyOn(todoStub, 'delete').mockRejectedValue(new Error());

        const request = {
            body: { },
        };

        const response = await sut.handle('DELETE', request);
        expect(response.statusCode).toBe(500);
    });

    test('Deveria retornar o statusCode 200 ao tentar deletar um Todo válido', async () => {
        const { sut } = makeSut();
        const request = {
            body: {
                id: -1,
            },
        };

        const response = await sut.handle('DELETE', request);
        expect(response.statusCode).toBe(200);
    });
    
    test('Deveria retornar o statusCode 200 ao deletar um Todo se os parametros estiverem válidos', async () => {
        const { sut, todoStub } = makeSut();
        const deleteSpy = jest.spyOn(todoStub, 'delete');
        const request = {
            body: {
                id: -1,
            },
        };

        await sut.handle('DELETE', request);
        expect(deleteSpy).toHaveBeenCalledWith({ id: -1 });
    });

    // Listar Todos
    test('Deveria retornar o statusCode 500 ao listar um Todo inválido', async () => {
        const { sut, todoStub } = makeSut();
        jest.spyOn(todoStub, 'get').mockRejectedValueOnce(new Error());

        const request = {
            body: { id: -1 },
        };

        const response = await sut.handle('GET', request);
        expect(response.statusCode).toBe(500);
    });

    test('Deveria retornar o statusCode 200 ao listar todos os Todos', async () => {
        const { sut, todoStub } = makeSut();
        const listSpy = jest.spyOn(todoStub, 'list');
        const request = {
            body: { },
        };

        const response = await sut.handle('GET', request);
        expect(listSpy).toHaveBeenCalledWith();
        expect(response.body).toHaveLength(2);
        expect(response.statusCode).toBe(200);
    });

    test('Deveria retornar o statusCode 200 ao listar um Todo válido', async () => {
        const { sut, todoStub } = makeSut();
        const listSpy = jest.spyOn(todoStub, 'get');
        const request = {
            body: { id: 1 },
        };

        const response = await sut.handle('GET', request);
        expect(listSpy).toHaveBeenCalledWith(request.body.id);
        expect(response.statusCode).toBe(200);
    });

    // Metodo inválido
    test('Deveria retornar o statusCode 500 tentar metodo inválido', async () => {
        const { sut } = makeSut();
        const request = {
            body: { },
        };

        const response = await sut.handle('INVALID_METHOD' as HttpMethod, request);
        expect(response.statusCode).toBe(500);
    });
});