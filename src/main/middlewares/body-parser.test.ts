import { Request, Response } from 'express';
import request from 'supertest';
import app from '../config';

describe('Body Parser Middleware', () => {
    test('Deveria retornar um objeto e não string', async () => {
        app.post('/body_parser', (req: Request, res: Response) => {
            res.send(req.body);
        });

        await request(app)
            .post('/body_parser')
            .send({ test: 'test' })
            .expect({ test: 'test' });
    });
});