import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../components/Login';
import { loginUser } from '../services/userService';

// Mock the loginUser service
jest.mock('../services/userService');

describe('Login Component', () => {
    test('renders login form', () => {
        render(
            <Router>
                <Login />
            </Router>
        );
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    test('handles login', async () => {
        loginUser.mockResolvedValue({ token: 'mockToken' });

        render(
            <Router>
                <Login />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        expect(loginUser).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' });
    });

    test('shows error message on failed login', async () => {
        loginUser.mockRejectedValue(new Error('Login failed'));

        render(
            <Router>
                <Login />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        expect(await screen.findByText(/login failed/i)).toBeInTheDocument();
    });
});
