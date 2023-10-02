import React, { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Snackbar, Container, Box, Grid } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useForm } from '../hooks/useForm';
import { login } from '../apis/index';
import { CustomTextField } from '../components/CustomTextField';

function Login() {
    const { setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const [values, handleChange] = useForm({ username: '', password: '' });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = await login(values.username, values.password);
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            setIsAuthenticated(true);
            navigate('/');
        } catch (error) {
            setOpen(true);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <CustomTextField
                                name="username"
                                label="Username"
                                value={values.username}
                                onChange={handleChange}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField
                                name="password"
                                label="Password"
                                type="password"
                                value={values.password}
                                onChange={handleChange}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
                        </Grid>
                    </Grid>
                </form>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        Login failed!
                        <div>Username: root</div>
                        <div>Password: 123456</div>
                    </Alert>
                </Snackbar>
            </Box>
        </Container>
    );
}

export default Login;