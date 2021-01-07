import { VehicleController } from '../../presentation/controllers/vehicle-controller';
import { DbVehicle } from '../../data/usecases/db-vehicle/db-vehicle';
import { SequelizeVehicleDbAdapter } from '../../infra/sequelize/vehicle/vehicle';
import { BrandValidatorAdapter } from '../../utils/brand-validator';

export const makeVehicleController = () => {
    const vehicleDbAdapter = new SequelizeVehicleDbAdapter();
    const dbVehicle = new DbVehicle(vehicleDbAdapter);
    const brandValidator = new BrandValidatorAdapter();
    const controller = new VehicleController(brandValidator, dbVehicle);
    return controller;
}