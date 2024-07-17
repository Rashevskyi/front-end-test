import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext/AuthContext';
import { LoginFormInputs, schema } from './login.types';

export const useLoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
        resolver: zodResolver(schema),
    });
    const router = useRouter();
    const { login } = useAuth();

    const onSubmit = async (data: LoginFormInputs) => {
        try {
            const response = await axios.post('https://dummyjson.com/auth/login', data);
            if (response.status === 200) {
                const { token, refreshToken, ...userData } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('user', JSON.stringify(userData));

                login(token);

                router.push('/');
            }
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        onSubmit
    };
};
