import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from '../components/TaskList';
import { getAllTasks, deleteTask } from '../services/taskService';

// Mock the taskService
jest.mock('../services/taskService');

const mockTasks = [
    { _id: '1', title: 'Task 1', dueDate: '2024-06-28', status: 'Scheduled', user: { name: 'John Doe' } },
    { _id: '2', title: 'Task 2', dueDate: '2024-06-30', status: 'Completed', user: { name: 'Jane Doe' } },
];

describe('TaskList Component', () => {
    beforeEach(() => {
        getAllTasks.mockResolvedValue(mockTasks);
    });

    test('renders task list', async () => {
        render(<TaskList />);

        expect(await screen.findByText(/task 1/i)).toBeInTheDocument();
        expect(screen.getByText(/task 2/i)).toBeInTheDocument();
    });

    test('filters tasks by user', async () => {
        render(<TaskList />);

        fireEvent.change(await screen.findByLabelText(/filter by user/i), { target: { value: 'John' } });

        expect(screen.getByText(/task 1/i)).toBeInTheDocument();
        expect(screen.queryByText(/task 2/i)).not.toBeInTheDocument();
    });

    test('filters tasks by date', async () => {
        render(<TaskList />);

        fireEvent.change(await screen.findByLabelText(/filter by date/i), { target: { value: '2024-06-28' } });

        expect(screen.getByText(/task 1/i)).toBeInTheDocument();
        expect(screen.queryByText(/task 2/i)).not.toBeInTheDocument();
    });

    test('deletes a task', async () => {
        deleteTask.mockResolvedValue({ msg: 'Task removed' });

        render(<TaskList />);

        fireEvent.click(await screen.findByText(/delete/i));

        expect(deleteTask).toHaveBeenCalledWith('1', expect.any(String));
    });
});
