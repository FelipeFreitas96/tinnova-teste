import { Express, Router } from 'express';
import useVehiclesRoute from '../routes/vehicles';
import useSwaggerRoute from '../routes/swagger';

export const useRoutes = (app: Express) => {
    const router = Router();
    useVehiclesRoute(router);
    useSwaggerRoute(router);
    app.use('/v1', router);
}