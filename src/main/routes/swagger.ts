import path from 'path';
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerPath = path.join(__dirname, '../../docs/swagger.yaml');
const swaggerDocument = YAML.load(swaggerPath);

export default (router: Router) => {
    router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}