const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // Your Express app

let server;

// Mock User data
const mockUser = {
    name: 'John Doe',
    email: 'john@example.com',
    password: '123456'
};

let token;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    server = app.listen(5001); // Use a different port for tests
});

afterAll(async () => {
    await mongoose.connection.close();
    await server.close();
});

beforeEach(async () => {
    // Clear users collection before each test
    await mongoose.connection.db.collection('users').deleteMany({});
});

describe('User API', () => {
    it('should register a user', async () => {
        const res = await request(server)
            .post('/api/users/register')
            .send(mockUser);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should log in a user', async () => {
        await request(server)
            .post('/api/users/register')
            .send(mockUser);

        const res = await request(server)
            .post('/api/users/login')
            .send({
                email: mockUser.email,
                password: mockUser.password
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        token = res.body.token;
    });

    it('should delete a user', async () => {
        await request(server)
            .post('/api/users/register')
            .send(mockUser);

        const res = await request(server)
            .post('/api/users/login')
            .send({
                email: mockUser.email,
                password: mockUser.password
            });

        token = res.body.token;

        const deleteRes = await request(server)
            .delete('/api/users')
            .set('x-auth-token', token);

        expect(deleteRes.statusCode).toEqual(200);
        expect(deleteRes.body).toHaveProperty('msg', 'User deleted');
    });
});
