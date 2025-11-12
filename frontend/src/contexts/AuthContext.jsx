import { createContext, useContext } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const auth = useAuth();
    return (
        <AuthContext.provider value={auth}>
            {children}
        </AuthContext.provider>
    )
}

export function useAuthContext() {
    return useContext(AuthContext)

}