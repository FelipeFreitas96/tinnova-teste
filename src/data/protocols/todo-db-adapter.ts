import { TodoModel } from "../../domain/models/todo";
import { AddTodoModel, UpdateTodoModel, DeleteTodoModel } from "../../domain/usecases/todo";

export interface TodoDbAdapter {
    list(): Promise<Array<TodoModel>>;
    get(todoId: number): Promise<TodoModel>;
    add(addTodoModel: AddTodoModel): Promise<TodoModel>;
    update(updateTodoModel: UpdateTodoModel): Promise<TodoModel>;
    delete(deleteTodoModel: DeleteTodoModel): Promise<TodoModel>;
    truncate(deleteTodoModel: DeleteTodoModel): Promise<void>;
}