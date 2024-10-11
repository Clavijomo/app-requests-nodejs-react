import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LoginPage } from './pages/auth/login/LoginPage';
import { SignUpPage } from './pages/auth/signUp/SignUpPage';
import { Dashboard } from './pages/dashboard/Dashboard';
import { AuthUserPath } from './routes/auth';
import { ProtectedRoute } from './routes/ProtectedRoute';

export const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path={AuthUserPath.principal}
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route path={AuthUserPath.principal} element={
                        <ProtectedRoute redirectTo={AuthUserPath.signUp}>
                            <Navigate to={AuthUserPath.principal} />
                        </ProtectedRoute>
                    } />

                    <Route path={AuthUserPath.signUp} element={<SignUpPage />} />
                    <Route path={AuthUserPath.login} element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
