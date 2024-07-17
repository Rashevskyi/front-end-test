import React from 'react';
import { Container, Box, Typography, CardContent, Grid, Avatar, TextField } from '@mui/material';
import { StyledCard, StyledButton } from '@/components/login/login.styles';
import { useLoginForm } from '@/components/login/login.form';

const LoginPage: React.FC = () => {
    const { register, handleSubmit, errors, onSubmit } = useLoginForm();

    return (
        <Container maxWidth="sm">
            <StyledCard>
                <CardContent>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>

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
