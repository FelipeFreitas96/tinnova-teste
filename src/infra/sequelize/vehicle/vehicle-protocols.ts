export interface VehicleModel {
    id: number;
    vehicle: string;
    brand: string;
    year: number;
    description: string;
    sold: boolean;
    hidden: boolean;
    createdAt: number;
    updatedAt: number;
}

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