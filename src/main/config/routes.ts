import { Express, Router} from 'express';
import { makeRouteAdapter } from '../adapters/routeAdapter';
import { makeTodoController } from '../factories/todoController';

export const useRoutes = (app: Express) => {
    const router = Router();
    const todoController = makeTodoController();
    router.use('/v1/todo', makeRouteAdapter(todoController));
    app.use(router);
}