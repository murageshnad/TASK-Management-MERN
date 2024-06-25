import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Register from '../components/Register';
import { registerUser } from '../services/userService';

// Mock the registerUser service
jest.mock('../services/userService');

describe('Register Component', () => {
    test('renders register form', () => {
        render(
            <Router>
                <Register />
            </Router>
        );
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
    });

    test('handles register', async () => {
        registerUser.mockResolvedValue({ token: 'mockToken' });

        render(
            <Router>
                <Register />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
        fireEvent.click(screen.getByRole('button', { name: /register/i }));

        expect(registerUser).toHaveBeenCalledWith({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password'
        });
    });

    test('shows error message on failed register', async () => {
        registerUser.mockRejectedValue(new Error('Registration failed'));

        render(
            <Router>
                <Register />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
        fireEvent.click(screen.getByRole('button', { name: /register/i }));

        expect(await screen.findByText(/registration failed/i)).toBeInTheDocument();
    });
});
