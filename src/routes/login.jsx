import { useContext, useEffect, useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Box, Typography, Container, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { LockOutlined } from '@mui/icons-material';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import { AuthorizationChangeContext, AuthorizationContext } from '../authorizationcontext';
import { axiosContext } from '../axioscontext';
import { login } from '../fetchdata';
import { Stack } from '@mui/system';

export default function Login() {
    const [isLoggingIn, setIsLoggingIn] = useState(false);
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

    if (isLoggingIn) {
        return (
            <Stack alignItems='center' >
                <CircularProgress />
            </Stack>
        )
    }
    const handleSubmit = async (event) => {
        setInvalidCredentials(false);
        event.preventDefault();
        setIsLoggingIn(true);
        const data = new FormData(event.currentTarget);
        const responseData = await login(axios, data);
        if (responseData == 400) {
            setInvalidCredentials(true);
        }
        else if (responseData) {
            localStorage.setItem('Authorization', `"Token ${responseData.token}"`);
            localStorage.setItem('User', JSON.stringify(responseData.user));
            localStorage.setItem('lastFetchTime', Date.now());
            setAuthorization(JSON.parse(localStorage.getItem('Authorization')));;
            redirect('/');
        }
        setIsLoggingIn(false);
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
                    Sign in
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
                        placeholder={invalidCredentials ? 'Enter Valid Credentials' : ''}
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
                        placeholder={invalidCredentials ? 'Enter Valid Credentials' : ''}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link component={ReactLink} to={'/register'}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}