const request = require('supertest');
const db = require('../../../client/cypress/db');

const baseUrl = 'http://localhost:3001';

describe('/api/login', () => {
    beforeEach(async () => {
        await db.seed();
    });

    afterAll(async () => {
        db.pool.end();
    });

    it('should respond with 400 if password is missing', async () => {
        const response = await request(baseUrl)
            .post('/api/login')
            .send({ email: 'haroon@gmail.com' });

        expect(response.status).toBe(400);
    });
});