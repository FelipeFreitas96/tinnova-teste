import { VehicleModel } from "../../../domain/models/vehicle";
import { AddVehicleModel, DeleteVehicleModel, Vehicle, UpdateVehicleModel } from "../../../domain/usecases/vehicle";
import { VehicleDbAdapter } from "../../protocols/vehicle-db-adapter";

export class DbVehicle implements Vehicle {
    private readonly vehicleDbAdapter: VehicleDbAdapter;
    constructor(vehicleDbAdapter: VehicleDbAdapter) {
        this.vehicleDbAdapter = vehicleDbAdapter;
    }

    async list(): Promise<Array<VehicleModel>> {
        let list = await this.vehicleDbAdapter.list();
        if (list.length > 0) {
            list = list.filter(newList => !newList.hidden);
        }
        return Promise.resolve(list);
    }
    
    async get(vehicleId: number): Promise<VehicleModel> {
        return this.vehicleDbAdapter.get(vehicleId);
    }

    add(addVehicleModel: AddVehicleModel): Promise<VehicleModel> {
        return this.vehicleDbAdapter.add(addVehicleModel);
    }

    async update(updateVehicleModel: UpdateVehicleModel): Promise<VehicleModel> {
        return this.vehicleDbAdapter.update(updateVehicleModel);
    }

    async delete(deleteVehicleModel: DeleteVehicleModel): Promise<VehicleModel> {
        return this.vehicleDbAdapter.delete(deleteVehicleModel);
    }
}