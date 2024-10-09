import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthUserPath } from './auth';
import { AuthProvider } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';

export const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path={AuthUserPath.signUp} element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
