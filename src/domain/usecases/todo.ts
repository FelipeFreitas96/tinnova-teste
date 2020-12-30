import { TodoModel } from "../models/todo";

export interface AddTodoModel {
    description?: string;
}

export interface UpdateTodoModel {
    id?: number;
    description?: string;
}

export interface DeleteTodoModel {
    id?: number;
}

export interface Todo {
    list(): Promise<Array<TodoModel>>;
    get(todoId: number): Promise<TodoModel>;
    add(addTodoModel: AddTodoModel): Promise<TodoModel>;
    update(updateTodoModel: UpdateTodoModel): Promise<TodoModel>;
    delete(deleteTodoModel: DeleteTodoModel): Promise<TodoModel>;
}