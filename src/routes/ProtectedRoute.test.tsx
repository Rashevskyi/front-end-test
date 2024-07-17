import React from 'react';
import { render, screen } from '@testing-library/react';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '@/context/AuthContext/AuthContext';
import { useRouter } from 'next/router';

jest.mock('../context/AuthContext/AuthContext');
jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe('ProtectedRoute', () => {
    const push = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ push });
    });

    it('renders children if authenticated', () => {
        (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: true, loading: false });

        render(<ProtectedRoute>Protected Content</ProtectedRoute>);

        expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });

    it('redirects to login if not authenticated', () => {
        (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: false, loading: false });

        render(<ProtectedRoute>Protected Content</ProtectedRoute>);

        expect(push).toHaveBeenCalledWith('/login');
    });
});
