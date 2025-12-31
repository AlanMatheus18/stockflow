import React from 'react';
import { Link } from "react-router-dom";

const RegisterForm = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-xl border border-gray-50">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Crie sua conta</h2>
          <p className="mt-2 text-sm text-gray-500">Comece sua jornada conosco hoje.</p>
        </div>
        
        <form className="space-y-4">
          {/* Campo Nome */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Nome Completo</label>
            <input 
              type="text" 
              placeholder="João Silva"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Campo E-mail */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">E-mail</label>
            <input 
              type="email" 
              placeholder="exemplo@email.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Grid para Senhas (lado a lado em telas maiores) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">Senha</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">Confirmar Senha</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input type="checkbox" className="w-4 h-4 text-amber-500 border-gray-300 rounded focus:ring-amber-500" />
            <label className="ml-2 text-xs text-gray-600">
              Eu aceito os <a to="Form" className="text-amber-600 underline">Termos e Condições</a>
            </label>
          </div>

          <button 
            type="submit" 
            className="w-full py-3 mt-2 font-bold text-white bg-amber-500 rounded-lg hover:bg-amber-600 active:scale-[0.98] transition-all shadow-lg shadow-amber-200"
          >
            Cadastrar
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Já tem uma conta? <Link to="/" className="font-bold text-amber-600 hover:text-amber-700 hover:underline">Faça login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;