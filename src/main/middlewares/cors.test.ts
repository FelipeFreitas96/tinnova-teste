import { Request, Response } from 'express';
import request from 'supertest';
import app from '../config';

describe('CORS Middleware', () => {
    test('Deveria retornar um objeto e não string', async () => {
        app.get('/test_cors', (req: Request, res: Response) => {
            res.send();
        });

        await request(app)
            .get('/test_cors')
            .expect('Access-Control-Allow-Origin', '*');
    });
}); 