// src/pages/Login.tsx
import { useState } from 'react';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../index.css';

interface LoginProps {
  setIsAuthenticated: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      setError('No user registered. Please register first.');
      return;
    }

    const user = JSON.parse(storedUser);
    if (user.email === email && user.password === password) {
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
      navigate('/');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <Box className="auth-container">
      <Box className="auth-form">
        <Typography variant="h4" className="auth-title">
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" className="auth-button" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
          <Typography sx={{ mt: 2, textAlign: 'center' }}>
            Don’t have an account?{' '}
            <Link className="auth-link" href="/register" underline="none">
              Register
            </Link>
          </Typography>
        </form>
      </Box>
    </Box>
  );
};

export default Login;