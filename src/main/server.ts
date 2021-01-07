import app from './config';
import SequelizeHelper from '../infra/sequelize/helpers/sequelize-helper';
import dotenv from "dotenv";
dotenv.config();

SequelizeHelper.connect(process.env.MYSQL_HOST as string).then(() => {
    const isConnected = SequelizeHelper.getConnection();
    if (isConnected) {
        app.listen(80, () => console.log("Rodando servidor express na porta 80."));
    }
});