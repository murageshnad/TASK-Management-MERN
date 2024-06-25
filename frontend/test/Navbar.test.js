import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../components/Navbar';

describe('Navbar Component', () => {
    test('renders navbar links', () => {
        render(
            <Router>
                <Navbar />
            </Router>
        );
        expect(screen.getByText(/task management/i)).toBeInTheDocument();
        expect(screen.getByText(/login/i)).toBeInTheDocument();
        expect(screen.getByText(/register/i)).toBeInTheDocument();
    });

    test('handles logout', () => {
        localStorage.setItem('token', 'mockToken');

        render(
            <Router>
                <Navbar />
            </Router>
        );

        fireEvent.click(screen.getByText(/logout/i));

        expect(localStorage.getItem('token')).toBe(null);
    });
});
