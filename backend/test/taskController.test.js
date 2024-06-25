const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); 

let server;

// Mock User and Task data
const mockUser = {
    name: 'John Doew',
    email: 'john12@example.com',
    password: '123456'
};

let token;
let taskId;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    server = app.listen(5003); // Use a different port for tests

    // Register and log in the user
    await request(server).post('/api/users/register').send(mockUser);
    const res = await request(server).post('/api/users/login').send({
        email: mockUser.email,
        password: mockUser.password
    });

    token = res.body.token;
});

afterAll(async () => {
    await mongoose.connection.close();
    await server.close();
});

beforeEach(async () => {
    // Clear tasks collection before each test
    await mongoose.connection.db.collection('tasks').deleteMany({});
});

describe('Task API', () => {
    it('should create a task', async () => {
        const res = await request(server)
            .post('/api/tasks')
            .set('x-auth-token', token)
            .send({
                title: 'Test Task',
                dueDate: '2024-06-28',
                status: 'Scheduled'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('title', 'Test Task');
        taskId = res.body._id;
    });

    it('should get all tasks', async () => {
        // Ensure a task exists
        await request(server)
            .post('/api/tasks')
            .set('x-auth-token', token)
            .send({
                title: 'Test Task',
                dueDate: '2024-06-28',
                status: 'Scheduled'
            });

        const res = await request(server)
            .get('/api/tasks/all')
            .set('x-auth-token', token);

        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should update a task', async () => {
        const createRes = await request(server)
            .post('/api/tasks')
            .set('x-auth-token', token)
            .send({
                title: 'Test Task',
                dueDate: '2024-06-28',
                status: 'Scheduled'
            });

        taskId = createRes.body._id;

        const res = await request(server)
            .put(`/api/tasks/${taskId}`)
            .set('x-auth-token', token)
            .send({
                title: 'Updated Task',
                dueDate: '2024-06-30',
                status: 'Completed'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('title', 'Updated Task');
        expect(res.body).toHaveProperty('status', 'Completed');
    });

    it('should delete a task', async () => {
        const createRes = await request(server)
            .post('/api/tasks')
            .set('x-auth-token', token)
            .send({
                title: 'Test Task',
                dueDate: '2024-06-28',
                status: 'Scheduled'
            });

        taskId = createRes.body._id;

        const res = await request(server)
            .delete(`/api/tasks/${taskId}`)
            .set('x-auth-token', token);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('msg', 'Task removed');
    });
});
