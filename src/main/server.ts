import app from './config';
import SequelizeHelper from '../infra/sequelize/helpers/sequelize-helper';

SequelizeHelper.connect().then(() => {
    const isConnected = SequelizeHelper.getConnection();
    if (isConnected) {
        app.listen(80, () => console.log("Rodando servidor express na porta 80."));
    }
});