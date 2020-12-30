import { Sequelize } from "sequelize";
import useTodoSequelizeModel from "../models/todo-sequelize-model";
import dotenv from "dotenv";
dotenv.config();

class SequelizeHelper {
    private connection!: Sequelize;
    public TodoSequelizeModel: any;

    getConnection(): Sequelize {
        return this.connection;
    }

    async connect(): Promise<void> {
        this.connection = new Sequelize({
            dialect: 'mariadb',
            host: process.env.MYSQL_HOST,
            username: process.env.MYSQL_ROOT_USER,
            password: process.env.MYSQL_ROOT_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });
        this.TodoSequelizeModel = useTodoSequelizeModel(this.connection);
        await this.sync();
    }

    async sync(): Promise<void> {
        await this.connection.sync();
    }
    
    async disconnect(): Promise<void> {
        await this.connection.close();
    }
}

export default new SequelizeHelper();