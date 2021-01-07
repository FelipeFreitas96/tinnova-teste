import { Request, Response } from "express";
import { HttpMethod, HttpRequest } from "../../presentation/protocols/http";
import { Controller } from "../../presentation/protocols/controller";

export const makeRouteAdapter = (controller: Controller) => {
    return async (req: Request, res: Response) => {
        const httpMethod: HttpMethod = req.method as HttpMethod;
        const httpRequest: HttpRequest = {
            body: req.body,
            params: req.params,
        };
        
        const response = await controller.handle(httpMethod, httpRequest);
        res.status(response.statusCode).json(response.body);
    }
}