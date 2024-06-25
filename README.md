
# Task Management MERN Stack Application

This is a full-stack task management application built using the MERN (MongoDB, Express.js, React, Node.js) stack. The application allows users to create, read, update, and delete (CRUD) tasks, manage user accounts, and filter tasks by user or date.

## Features

- User Registration and Authentication
- Add, Update, Delete Tasks
- List all Tasks
- Filter Tasks by User or Date
- User Management (Sign Up, Sign In, Delete Account)

## Technologies Used

- MongoDB
- Express.js
- React.js
- Node.js
- Axios
- JWT for authentication
- bcryptjs for password hashing
- dotenv for environment variables

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed and running locally or a MongoDB Atlas account
- npm or yarn installed

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/task-management.git
    cd task-management
    ```

2. Set up the backend:

    ```bash
    cd backend
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add your MongoDB URI and JWT secret:

    ```
    MONGO_URI=your_mongo_uri
    JWT_SECRET=your_jwt_secret
    ```

4. Start the backend server:

    ```bash
    npm run dev
    ```

5. Set up the frontend:

    ```bash
    cd ../frontend
    npm install
    ```

6. Start the frontend development server:

    ```bash
    npm start
    ```

### Running the Application

1. Ensure MongoDB is running.
2. Start the backend server from the `backend` directory:

    ```bash
    npm run dev
    ```

3. Start the frontend development server from the `frontend` directory:

    ```bash
    npm start
    ```

4. Open your browser and navigate to `http://localhost:3000`.

## API Endpoints

### User Endpoints

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Authenticate a user and get a token
- `DELETE /api/users` - Delete the authenticated user

### Task Endpoints

- `GET /api/tasks` - Get all tasks for the authenticated user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## File Structure

task-management/
├── backend/
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ │ ├── taskController.js
│ │ └── userController.js
│ ├── middleware/
│ │ └── auth.js
│ ├── models/
│ │ ├── Task.js
│ │ └── User.js
│ ├── routes/
│ │ ├── taskRoutes.js
│ │ └── userRoutes.js
│ ├── .env
│ ├── package.json
│ └── server.js
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── services/
│ │ ├── App.js
│ │ ├── index.js
│ │ └── ...
│ ├── .env
│ ├── package.json
│ └── ...
└── README.md
![tasks](https://github.com/murageshnad/TASK-Management-MERN-Backend/assets/42669128/f544baee-2238-43d9-a529-14aa57fc9c3b)

![image](https://github.com/murageshnad/TASK-Management-MERN-Backend/assets/42669128/b012e618-4139-44ce-9a73-c7d67a00acca)


