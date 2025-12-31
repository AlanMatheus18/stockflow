import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages
import Home from '../pages/Home'
import Login from '../pages/Login'
import Products from '../pages/Products'
import Movements from '../pages/Movements'
import Reports from '../pages/Reports'
import FormCadastro from "../components/FormCadastro";
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<FormCadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/movements" element={<Movements />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  )
}
