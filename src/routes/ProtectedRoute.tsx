import React from 'react';
import { useRouter } from 'next/router';
import paths from './paths';
import { useAuth } from '@/context/AuthContext/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    React.useEffect(() => {
        if (!isAuthenticated) {
            router.push(paths.login);
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
