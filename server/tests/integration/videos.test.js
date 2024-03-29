const request = require('supertest');
const db = require('../../../client/cypress/db');
const util = require('../util');

const baseUrl = 'http://localhost:3001';
let token;
let userId = 1;

describe('/api/videos', () => {
    beforeAll(async () => {
        const getToken = await util.getToken('haroon@gmail.com', 'password321');
        token = getToken.body.token;
    });

    beforeEach(async () => {
        await db.seed();
    });

    afterAll(async () => {
        db.pool.end();
    });

    it('should get videos', async () => {
        const response = await request(baseUrl)
            .get(`/api/videos/user/${userId}`)
            .set('x-auth-token', token);

        expect(response.body.videos[0]).toHaveProperty('video_id', 'NQ-2eJvakBo');
    });

    it('should increase rating of video', async () => {
        const response = await request(baseUrl)
            .patch(`/api/videos/1/inc-rating`)
            .set('x-auth-token', token);

        expect(response.status).toBe(200);
    });

    it('should delete the video', async () => {
        const response = await request(baseUrl)
            .delete(`/api/videos/1`)
            .set('x-auth-token', token);

        expect(response.status).toBe(200);
    });
});