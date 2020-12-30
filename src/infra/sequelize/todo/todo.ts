import { AddTodoModel, TodoModel } from "./todo-protocols";
import { TodoDbAdapter } from "../../../data/protocols/todo-db-adapter";
import { UpdateTodoModel, DeleteTodoModel } from "../../../domain/usecases/todo";
import SequelizeHelper from '../helpers/sequelize-helper';

export class SequelizeTodoDbAdapter implements TodoDbAdapter {
    async truncate(): Promise<void> {
        await SequelizeHelper.TodoSequelizeModel.destroy({ truncate: true, cascade: false });
    }
    list(): Promise<TodoModel[]> {
        return SequelizeHelper.TodoSequelizeModel.findAll();
    }
    get(todoId: number): Promise<TodoModel> {
        return SequelizeHelper.TodoSequelizeModel.findByPk(todoId);
    }
    async update(updateTodoModel: UpdateTodoModel): Promise<TodoModel> {
        await SequelizeHelper.TodoSequelizeModel.update({
            description: updateTodoModel.description
        }, {
            where: { id: updateTodoModel.id },
        });
        return this.get(Number(updateTodoModel.id));
    }
    async delete(deleteTodoModel: DeleteTodoModel): Promise<TodoModel> {
        await SequelizeHelper.TodoSequelizeModel.update({
            hidden: true,
        }, {
            where: { id: deleteTodoModel.id },
        });
        return this.get(Number(deleteTodoModel.id));
    }
    add(addTodoModel: AddTodoModel): Promise<TodoModel> {
        return SequelizeHelper.TodoSequelizeModel.create(addTodoModel);
    }   
}