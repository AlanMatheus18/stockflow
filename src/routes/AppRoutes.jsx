
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import { AuthProvider, useAuth } from '../AuthContext';
// Pages
import Home from '../pages/Home'
import Login from '../pages/Login'
import Products from '../pages/Products'
import Movements from '../pages/Movements'
import Reports from '../pages/Reports'
import FormCadastro from "../components/FormCadastro";



const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
};
export default function AppRoutes() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<FormCadastro />} />

          {/* Rotas Protegidas (Sempre dentro do PrivateRoute) */}
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
          <Route path="/movements" element={<PrivateRoute><Movements /></PrivateRoute>} />
          <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
          
          {/* Redirecionamento de segurança: se a rota não existir, vai para o login */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}