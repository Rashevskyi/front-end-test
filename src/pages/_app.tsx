import React from 'react';
import { AppProps } from 'next/app';
import { AuthProvider } from '@/context/AuthContext/AuthContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    );
};

export default MyApp;
