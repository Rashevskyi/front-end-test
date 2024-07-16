import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { useRouter } from 'next/router';
import { TextField, Button, Container, Box, Typography, Card, CardContent, Grid, Avatar } from '@mui/material';
import styled from '@emotion/styled';
import { useAuth } from '@/context/AuthContext/AuthContext';

const schema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
});

type LoginFormInputs = z.infer<typeof schema>;

const StyledCard = styled(Card)`
  padding: 20px;
  margin-top: 10vh;
  box-shadow: 0px 3px 6px #00000029;
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
`;

const LoginPage: React.FC = () => {
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

    return (
        <Container maxWidth="sm">
            <StyledCard>
                <CardContent>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            {/* You can use a Material-UI icon or another avatar */}
                        </Avatar>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Login
                        </Typography>
                    </Box>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Username"
                                    {...register('username')}
                                    error={!!errors.username}
                                    helperText={errors.username?.message}
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Password"
                                    type="password"
                                    {...register('password')}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <StyledButton type="submit" variant="contained" color="primary" fullWidth>
                                    Login
                                </StyledButton>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </StyledCard>
        </Container>
    );
};

export default LoginPage;
