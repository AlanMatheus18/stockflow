import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../AuthContext';

const Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const { error } = await signIn(email, password);
    
    if (error) {
      alert("Erro ao entrar: " + error.message);
      setIsSubmitting(false);
    } else {
      navigate('/home');
    }
  };

  return (
    /* Fundo combinando com a Home: Gradient Dark */
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#1f2329] to-[#2b3036] p-4">
      
      {/* Card de Login Responsivo */}
      <div className="w-full max-w-[400px] p-8 space-y-6 bg-zinc-900/50 border border-zinc-700/50 rounded-2xl shadow-2xl backdrop-blur-sm">
        
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">Login</h2>
          <p className="text-sm text-zinc-400">Entre para gerenciar seu estoque</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300 ml-1">E-mail</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 text-white rounded-xl focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all placeholder:text-zinc-600"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between ml-1">
              <label className="text-sm font-medium text-zinc-300">Senha</label>
              <a href="#" className="text-xs text-amber-500 hover:text-amber-400">Esqueceu a senha?</a>
            </div>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 text-white rounded-xl focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all placeholder:text-zinc-600"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 mt-2 font-bold text-zinc-900 bg-amber-500 rounded-xl hover:bg-amber-400 active:scale-[0.98] transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Autenticando..." : "Entrar no Sistema"}
          </button>
        </form>

        <div className="pt-4 text-center">
          <p className="text-sm text-zinc-500">
            Não tem uma conta?{" "}
            <Link to='/cadastro' className="text-amber-500 hover:text-amber-400 font-semibold underline-offset-4 hover:underline">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Form;