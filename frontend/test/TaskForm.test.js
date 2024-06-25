import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from '../components/TaskForm';
import { createTask, updateTask } from '../services/taskService';

// Mock the taskService
jest.mock('../services/taskService');

const mockTask = { _id: '1', title: 'Task 1', dueDate: '2024-06-28', status: 'Scheduled', user: { name: 'John Doe' } };

describe('TaskForm Component', () => {
    test('renders task form', () => {
        render(<TaskForm />);

        expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/due date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
    });

    test('handles create task', async () => {
        createTask.mockResolvedValue(mockTask);

        render(<TaskForm onTaskAdded={jest.fn()} />);

        fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Task 1' } });
        fireEvent.change(screen.getByLabelText(/due date/i), { target: { value: '2024-06-28' } });
        fireEvent.change(screen.getByLabelText(/status/i), { target: { value: 'Scheduled' } });
        fireEvent.click(screen.getByRole('button', { name: /add task/i }));

        expect(createTask).toHaveBeenCalledWith({
            title: 'Task 1',
            dueDate: '2024-06-28',
            status: 'Scheduled'
        }, expect.any(String));
    });

    test('handles update task', async () => {
        updateTask.mockResolvedValue(mockTask);

        render(<TaskForm task={mockTask} onTaskUpdated={jest.fn()} />);

        fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Updated Task' } });
        fireEvent.change(screen.getByLabelText(/due date/i), { target: { value: '2024-06-30' } });
        fireEvent.change(screen.getByLabelText(/status/i), { target: { value: 'Completed' } });
        fireEvent.click(screen.getByRole('button', { name: /update task/i }));

        expect(updateTask).toHaveBeenCalledWith({
            title: 'Updated Task',
            dueDate: '2024-06-30',
            status: 'Completed'
        }, '1', expect.any(String));
    });
});
