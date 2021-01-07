import { VehicleModel } from "../../domain/models/vehicle";
import { AddVehicleModel, UpdateVehicleModel, DeleteVehicleModel } from "../../domain/usecases/vehicle";

export interface VehicleDbAdapter {
    list(): Promise<Array<VehicleModel>>;
    get(todoId: number): Promise<VehicleModel>;
    add(addVehicleModel: AddVehicleModel): Promise<VehicleModel>;
    update(updateVehicleModel: UpdateVehicleModel): Promise<VehicleModel>;
    delete(deleteVehicleModel: DeleteVehicleModel): Promise<VehicleModel>;
    truncate(deleteVehicleModel: DeleteVehicleModel): Promise<void>;
}