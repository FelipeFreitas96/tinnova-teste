import { VehicleModel } from "../models/vehicle";

export interface AddVehicleModel {
    vehicle?: string;
    brand?: string;
    year?: number;
    description?: string;
    sold?: boolean;
}

export interface UpdateVehicleModel {
    id?: number;
    vehicle?: string;
    brand?: string;
    year?: number;
    description?: string;
    sold?: boolean;
}

export interface DeleteVehicleModel {
    id?: number;
}

export interface Vehicle {
    list(): Promise<Array<VehicleModel>>;
    get(todoId: number): Promise<VehicleModel>;
    add(addVehicleModel: AddVehicleModel): Promise<VehicleModel>;
    update(updateVehicleModel: UpdateVehicleModel): Promise<VehicleModel>;
    delete(deleteVehicleModel: DeleteVehicleModel): Promise<VehicleModel>;
}