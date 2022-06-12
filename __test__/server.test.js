'use strict';
const { app } = require('../auth/server'); 
const supertest = require('supertest');
const mockRequest = supertest(app);

const { db } = require('../auth/models/index');

beforeAll(async () => {
    await db.sync();
});

describe('Server Test',()=>{
    it('404 on a bad route', async () => {
        const response = await mockRequest.post('/anything');
        expect(response.status).toBe(404);
    });
    it('404 on a bad method', async () => {
        const response = await mockRequest.get('/signin');
        expect(response.status).toBe(404);
    });
    it('POST to /signup to create a new user', async () => {
        const response = await mockRequest.post('/signup').send({
            "username": "sami",
            "password": "123"
          });
        expect(response.status).toBe(201);
    });
    it('POST to /signin to login as a user (use basic auth)', async () => {
        const response = await mockRequest.post('/signin').auth('sami','123');
        expect(response.status).toBe(200);
    });
    it('Sign in with wrong password', async () => {
        const response = await mockRequest.post('/signin').auth('sami','12');
        expect(response.status).toBe(500);
    });
    it('Sign in with wrong username', async () => {
        const response = await mockRequest.post('/signin').auth('sara','123');
        expect(response.status).toBe(500);
    });
})

afterAll(async () => {
    await db.drop();
});


