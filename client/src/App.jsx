import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthUserPath } from './routes/auth';
import { AuthProvider } from './context/AuthContext';
import { SignUpPage } from './pages/auth/signUp/SignUpPage';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { LoginPage } from './pages/auth/login/LoginPage';
import { Dashboard } from './pages/dashboard/Dashboard';

export const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path={AuthUserPath.signUp} element={<SignUpPage />} />
                    <Route path={AuthUserPath.login} element={<LoginPage />} />
                    <Route path={AuthUserPath.dashboard}
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
