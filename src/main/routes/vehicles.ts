import { Router } from 'express';
import { makeRouteAdapter } from '../adapters/routeAdapter';
import { makeVehicleController } from '../factories/vehicleController';

export default (router: Router) => {
    const vehicleController = makeVehicleController();
    router.use('/vehicles/:id?', makeRouteAdapter(vehicleController));
}