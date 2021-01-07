import { AddVehicleModel, VehicleModel } from "./vehicle-protocols";
import { VehicleDbAdapter } from "../../../data/protocols/vehicle-db-adapter";
import { UpdateVehicleModel, DeleteVehicleModel } from "../../../domain/usecases/vehicle";
import SequelizeHelper from '../helpers/sequelize-helper';

export class SequelizeVehicleDbAdapter implements VehicleDbAdapter {
    async truncate(): Promise<void> {
        await SequelizeHelper.VehicleSequelizeModel.destroy({ truncate: true, cascade: false });
    }
    list(): Promise<VehicleModel[]> {
        return SequelizeHelper.VehicleSequelizeModel.findAll();
    }
    get(todoId: number): Promise<VehicleModel> {
        return SequelizeHelper.VehicleSequelizeModel.findByPk(todoId);
    }
    async update(updateVehicleModel: UpdateVehicleModel): Promise<VehicleModel> {
        const { id, ...withoutId } = updateVehicleModel;
        await SequelizeHelper.VehicleSequelizeModel.update({
            ...withoutId
        }, {
            where: { id },
        });
        return this.get(Number(id));
    }
    async delete(deleteVehicleModel: DeleteVehicleModel): Promise<VehicleModel> {
        await SequelizeHelper.VehicleSequelizeModel.update({
            hidden: true,
        }, {
            where: { id: deleteVehicleModel.id },
        });
        return this.get(Number(deleteVehicleModel.id));
    }
    add(addVehicleModel: AddVehicleModel): Promise<VehicleModel> {
        return SequelizeHelper.VehicleSequelizeModel.create(addVehicleModel);
    }   
}