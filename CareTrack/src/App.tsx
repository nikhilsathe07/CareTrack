// src/App.tsx
import { useState, useEffect } from 'react';
// import logo from './assets/svg-logo.svg';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/Dashboard';
import History from './pages/History';
import AddMedication from './pages/AddMedication';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import NotificationBanner from './components/NotificationBanner';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import logo from './assets/logo.png'; // Adjust path to your logo file

const queryClient = new QueryClient();

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );
  const [theme, setTheme] = useState<'dark' | 'light'>(
    (localStorage.getItem('theme') as 'dark' | 'light') || 'light' // Load from localStorage, default to 'light'
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme); // Store in localStorage
      return newTheme;
    });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className={theme}>
          {isAuthenticated && (
            <AppBar
              position="static"
              sx={{
                backgroundColor: theme === 'dark' ? '#1a1a2e' : '#ffffff',
                color: theme === 'dark' ? '#ffffff' : '#333333',
                boxShadow: theme === 'dark' ? '0 2px 8px rgba(255, 255, 255, 0.1)' : '0 2px 8px rgba(0, 0, 0, 0.05)',
              }}
            >
              <Toolbar>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                  <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
                  
                    <img
                      src={logo}
                      alt="CareTrack Logo"
                      style={{
                        height: '70px', // Matches h6 font-size (1.25rem = 20px)
                        width: 'auto', // Maintains aspect ratio
                      }}
                    />
                  </Link>
                </Box>
                <Button color="inherit" component={Link} to="/">
                  Dashboard
                </Button>
                <Button color="inherit" component={Link} to="/history">
                  History
                </Button>
                <Button color="inherit" component={Link} to="/add-medication">
                  Add Medication
                </Button>
                <Button color="inherit" component={Link} to="/settings">
                  Settings
                </Button>
                <Button color="inherit" component={Link} to="/profile">
                  Profile
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </Toolbar>
            </AppBar>
          )}
          <Box sx={{ mt: isAuthenticated ? 2 : 0, minHeight: 'calc(100vh - 64px - 60px)' }}>
            {isAuthenticated && <NotificationBanner />}
            <Routes>
              <Route
                path="/login"
                element={<Login setIsAuthenticated={setIsAuthenticated} />}
              />
              <Route
                path="/register"
                element={<Register setIsAuthenticated={setIsAuthenticated} />}
              />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard theme={theme} toggleTheme={toggleTheme} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/history"
                element={
                  <ProtectedRoute>
                    <History />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-medication"
                element={
                  <ProtectedRoute>
                    <AddMedication />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Box>
          {isAuthenticated && (
            <Box
              className="footer"
              sx={{
                padding: '1rem',
                textAlign: 'center',
                backgroundColor: theme === 'dark' ? '#1a1a2e' : '#f5f6f5',
                color: theme === 'dark' ? '#ffffff' : '#333333',
                borderTop: theme === 'dark' ? '1px solid #444466' : '1px solid #e0e0e0',
              }}
            >
              <Typography variant="body2">
                © {new Date().getFullYear()} CareTrack. All rights reserved.
              </Typography>
            </Box>
          )}
          <ToastContainer />
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;