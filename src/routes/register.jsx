import { Avatar, Button, CssBaseline, TextField, Link, Box, Typography, Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import { LockOutlined } from '@mui/icons-material';
import { register } from '../fetchdata';
import { useContext, useEffect, useState } from 'react';
import { AuthorizationChangeContext, AuthorizationContext } from '../authorizationcontext';
import { axiosContext } from '../axioscontext';
import { Stack } from '@mui/system';
import { CircularProgress } from '@mui/material';

export default function Register() {
    const [isRegistering, setIsRegistering] = useState(false);
    const authorization = useContext(AuthorizationContext);
    const setAuthorization = useContext(AuthorizationChangeContext);
    const axios = useContext(axiosContext);
    const redirect = useNavigate();
    const [invalidCredentials, setInvalidCredentials] = useState(false);

    useEffect(() => {
        if (authorization != null) {
            redirect('/')
        }
    }, [])

    if (isRegistering) {
        return (
            <Stack alignItems='center' >
                <CircularProgress />
            </Stack>
        )
    }
    const handleSubmit = async (event) => {
        setInvalidCredentials(false);
        event.preventDefault();
        setIsRegistering(true);
        const data = new FormData(event.currentTarget);
        const responseData = await register(axios, data);
        if (responseData == 400) {
            setInvalidCredentials(true);
        }
        else if (responseData) {
            localStorage.setItem('Authorization', `"Token ${responseData.token}"`);
            localStorage.setItem('User', JSON.stringify(responseData.user));
            localStorage.setItem('lastFetchTime', Date.now())
            setAuthorization(JSON.parse(localStorage.getItem('Authorization')));
            redirect('/');
        }
        setIsRegistering(false);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        error={invalidCredentials}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        placeholder={invalidCredentials ? 'User with this Email Already Exists' : ''}
                    />
                    <TextField
                        error={invalidCredentials}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link component={ReactLink} to={'/login'} variant="body2">
                                {"Already Have an Account? Sign In"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}