import React from 'react';
import { Link } from "react-router-dom";

const Form = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>
        
        <form className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">E-mail</label>
            <input 
              type="email" 
              placeholder="seu@email.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Senha</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all"
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-3 mt-4 font-semibold text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors shadow-md"
          >
            Entrar
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Não tem uma conta? <Link to='/cadastro' className="text-amber-600 hover:underline">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
};

export default Form;