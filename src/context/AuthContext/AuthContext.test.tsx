import React from 'react';
import { render, act, screen } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';
import nextRouterMock from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));

jest.mock('axios');

const TestComponent: React.FC = () => {
    const { isAuthenticated, login, logout } = useAuth();

    return (
        <div>
            <div>{`Authenticated: ${isAuthenticated}`}</div>
            <button onClick={() => login('testToken')}>Login</button>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

describe('AuthContext', () => {
    beforeEach(() => {
        nextRouterMock;
    });

    it('initially checks authentication status', async () => {
        localStorage.setItem('token', 'testToken');
        await act(async () => {
            render(
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            );
        });

        expect(screen.getByText('Authenticated: true')).toBeInTheDocument();
    });

    it('logs in correctly', async () => {
        await act(async () => {
            render(
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            );
        });

        act(() => {
            screen.getByText('Login').click();
        });

        expect(localStorage.getItem('token')).toBe('testToken');
        expect(screen.getByText('Authenticated: true')).toBeInTheDocument();
    });

    it('logs out correctly', async () => {
        localStorage.setItem('token', 'testToken');
        await act(async () => {
            render(
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            );
        });

        act(() => {
            screen.getByText('Logout').click();
        });

        expect(localStorage.getItem('token')).toBe(null);
        expect(screen.getByText('Authenticated: false')).toBeInTheDocument();
    });
});
