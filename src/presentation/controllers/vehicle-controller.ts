import { HttpMethod, HttpRequest, HttpResponse } from '../protocols/http';
import { AddVehicleModel, DeleteVehicleModel, Vehicle } from '../../domain/usecases/vehicle';
import { Controller } from '../protocols/controller';
import { BrandValidator } from '../protocols/brand-validator';
import { ErrorParser, ErrorCode } from '../../utils/error-parser';
import { UpdateVehicleModel } from '../../infra/sequelize/vehicle/vehicle-protocols';
import { pickBy, identity } from 'lodash';

export class VehicleController implements Controller {
    private readonly vehicle: Vehicle;
    private readonly brandValidator: BrandValidator;

    constructor(brandValidator: BrandValidator, vehicle: Vehicle) {
        this.vehicle = vehicle;
        this.brandValidator = brandValidator;
    }

    async handlePutMethod(updateVehicleModel: UpdateVehicleModel) {
        if (!updateVehicleModel.id) {
            return Promise.reject(
                new ErrorParser({
                    body: "Id inválido.",
                    statusCode: ErrorCode.INVALID_REQUEST,
                })
            );
        } else if(updateVehicleModel.brand && !this.brandValidator.isValid(updateVehicleModel.brand)) {
            return Promise.reject(
                new ErrorParser({
                    body: "Marca inválida.",
                    statusCode: ErrorCode.INVALID_REQUEST,
                })
            );
        }

        const cleanedObject = pickBy(updateVehicleModel, identity)
        const gettedVehicle = await this.vehicle.get(updateVehicleModel.id);
        if (!gettedVehicle || gettedVehicle.hidden) {
            return Promise.reject(
                new ErrorParser({
                    body: "Id não encontrado.",
                    statusCode: ErrorCode.NOT_FOUND,
                })
            );
        } else if (Object.keys(cleanedObject).length < 2) {
            return Promise.reject(
                new ErrorParser({
                    body: "Necessário ao menos um parâmetro.",
                    statusCode: ErrorCode.INVALID_REQUEST,
                })
            );
        }
        
        return await this.vehicle.update(updateVehicleModel);
    }

    async handleDeleteMethod(deleteVehicleModel: DeleteVehicleModel) {
        if (!deleteVehicleModel.id) {
            return Promise.reject(
                new ErrorParser({
                    body: "Id inválido.",
                    statusCode: ErrorCode.INVALID_REQUEST,
                })
            );
        }
        
        const gettedVehicle = await this.vehicle.get(deleteVehicleModel.id);
        if (!gettedVehicle || gettedVehicle.hidden) {
            return Promise.reject(
                new ErrorParser({
                    body: "Id não encontrado.",
                    statusCode: ErrorCode.NOT_FOUND,
                })
            );
        }
        return await this.vehicle.delete(deleteVehicleModel);
    }
    
    async handlePostMethod(addVehicleModel: AddVehicleModel) {
        if (!addVehicleModel.vehicle) {
            return Promise.reject(
                new ErrorParser({
                    body: 'Veículo inválido.',
                    statusCode: ErrorCode.INVALID_REQUEST,
                })
            );
        } else if (!addVehicleModel.brand ||
                   (addVehicleModel.brand && !this.brandValidator.isValid(addVehicleModel.brand))) {
            return Promise.reject(
                new ErrorParser({
                    body: "Marca inválida.",
                    statusCode: ErrorCode.INVALID_REQUEST,
                })
            );
        } else if (!addVehicleModel.year) {
            return Promise.reject(
                new ErrorParser({
                    body: "Ano inválido.",
                    statusCode: ErrorCode.INVALID_REQUEST,
                })
            );
        } else if (!addVehicleModel.description) {
            return Promise.reject(
                new ErrorParser({
                    body: "Descrição inválida.",
                    statusCode: ErrorCode.INVALID_REQUEST,
                })
            );
        } else if (addVehicleModel.sold === undefined) {
            return Promise.reject(
                new ErrorParser({
                    body: "Vendido inválido.",
                    statusCode: ErrorCode.INVALID_REQUEST,
                })
            );
        }
        return await this.vehicle.add(addVehicleModel);
    }

    async handleGetMethod(vehicleId: number) {
        const gettedVehicle = await this.vehicle.get(vehicleId);
        if (!gettedVehicle || gettedVehicle.hidden) {
            return Promise.reject(
                new ErrorParser({
                    body: "Id não encontrado.",
                    statusCode: ErrorCode.NOT_FOUND,
                })
            );
        }
        
        return gettedVehicle;
    }

    async handleListMethod() {
        return this.vehicle.list();
    }

    async handle(httpMethod: HttpMethod, httpRequest: HttpRequest): Promise<HttpResponse> {
        const response: HttpResponse = {
            statusCode: ErrorCode.OK,
            body: '',
        };

        try {
            const httpBody = httpRequest.body;
            const httpParams = httpRequest.params;
            const { id, vehicle, brand, year, description, sold }: any = { ...httpBody, ...httpParams };

            if (httpMethod === 'POST') {
                response.body = await this.handlePostMethod({ vehicle, brand, year, description, sold });
            } else if (httpMethod === 'DELETE') {
                response.body = await this.handleDeleteMethod({ id });
            } else if (httpMethod === 'PUT') {
                response.body = await this.handlePutMethod({ id, vehicle, brand, year, description, sold });
            } else if (httpMethod === 'GET') {
                if (id) {
                    response.body = await this.handleGetMethod(id);
                } else {
                    response.body = await this.handleListMethod();
                }
            } else {
                throw new ErrorParser({
                    body: "Method not allowed.",
                    statusCode: ErrorCode.METHOD_NOT_ALLOWED,
                });
            }
        } catch (err) {
            response.body = err.toString();
            response.statusCode = err.statusCode;
        }

        return Promise.resolve(response);
    }
}