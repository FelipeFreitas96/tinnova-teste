import { TodoController } from '../../presentation/controllers/todo-controller';
import { DbTodo } from '../../data/usecases/db-todo/db-todo';
import { SequelizeTodoDbAdapter } from '../../infra/sequelize/todo/todo';

export const makeTodoController = () => {
    const todoDbAdapter = new SequelizeTodoDbAdapter();
    const dbTodo = new DbTodo(todoDbAdapter);
    const controller = new TodoController(dbTodo);
    return controller;
}