import { AuthProvider } from './context/AuthContext';
import AppRouter from './router';
import './styles/globals.css';

function App() {
    return (
        <AuthProvider>
            <AppRouter />
        </AuthProvider>
    );
}

export default App;
