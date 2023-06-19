import { useContext, useState } from 'react';
import { TextField, Button, Card } from '@mui/material';
import classes from './Login.module.scss'
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('mominnawaf@gmail.com');
    const [password, setPassword] = useState('1234567');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setEmailError(false);
        setPasswordError(false);

        if (email === '') {
            setEmailError(true);
        }
        if (password === '') {
            setPasswordError(true);
        }
        if (email && password) {
            login({ email, password });
            navigate('/');
        }
    };
    return (
        <Card elevation={0} className={classes.loginCard}>
            <form autoComplete="off" onSubmit={handleSubmit} className={classes.loginForm}>
                <h2>Login Form</h2>
                <TextField
                    label="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="email"
                    sx={{ mb: 3, backgroundColor: '#fff' }}
                    fullWidth
                    value={email}
                    error={emailError}
                />
                <TextField
                    label="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="password"
                    value={password}
                    error={passwordError}
                    fullWidth
                    sx={{ mb: 3, backgroundColor: '#fff' }}
                />
                <Button variant="contained" color="secondary" type="submit" sx={{ width: '80%' }}>
                    Login
                </Button>
                <p>Enter any email and password to login</p>
            </form>

        </Card>
    )
}

export default Login