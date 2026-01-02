import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../AuthContext';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signUp } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    setIsSubmitting(true);
    const { error } = await signUp(email, password);
    
    if (error) {
      alert(error.message);
      setIsSubmitting(false);
    } else {
      alert("Sucesso! Verifique seu e-mail para confirmar o cadastro.");
      setIsSubmitting(false);
    }
  };

  return (
    /* Fundo Dark combinando com o Dashboard */
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#1f2329] to-[#2b3036] p-4">
      
      {/* Card de Cadastro Responsivo */}
      <div className="w-full max-w-[500px] p-8 space-y-6 bg-zinc-900/50 border border-zinc-700/50 rounded-2xl shadow-2xl backdrop-blur-sm">
        
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-white">Crie sua conta</h2>
          <p className="text-sm text-zinc-400">Comece a gerenciar seu estoque de forma profissional.</p>
        </div>
        
        <form className="space-y-5" onSubmit={handleRegister}>
          {/* E-mail */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300 ml-1">E-mail Profissional</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplo@email.com"
              className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 text-white rounded-xl focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all placeholder:text-zinc-600"
            />
          </div>

          {/* Grid de Senhas Responsivo: 1 col no mobile, 2 col no tablet/desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 ml-1">Senha</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 text-white rounded-xl focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all placeholder:text-zinc-600"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 ml-1">Confirmar Senha</label>
              <input 
                type="password" 
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 text-white rounded-xl focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all placeholder:text-zinc-600"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-3 mt-2 font-bold text-zinc-900 bg-amber-500 rounded-xl hover:bg-amber-400 active:scale-[0.98] transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Processando..." : "Criar Minha Conta"}
          </button>
        </form>

        <div className="pt-2 text-center">
          <p className="text-sm text-zinc-500">
            Já tem uma conta?{" "}
            <Link to="/" className="font-bold text-amber-500 hover:text-amber-400 hover:underline underline-offset-4">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;