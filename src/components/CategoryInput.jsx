import React, { useState } from 'react';
import { X } from 'lucide-react'; // Certifique-se de ter o lucide-react instalado

export function CategoryInput({ tags = [], setTags }) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    // Adiciona com Enter ou Vírgula
    if ((e.key === 'Enter' || e.key === ',') && inputValue.trim() !== '') {
      e.preventDefault();
      const newTag = inputValue.trim().replace(/,/g, '');
      
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInputValue('');
    }
    // Remove a última tag com Backspace se o input estiver vazio
    else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      removeCategory(tags.length - 1);
    }
  };

  const removeCategory = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-zinc-400 text-sm ml-1">
        Categorias
      </label>
      
      <div className="flex flex-wrap gap-2 p-2 bg-zinc-800/50 border border-zinc-700 rounded-xl min-h-[52px] focus-within:border-amber-500 transition-all shadow-inner">
        {/* Renderização das Tags Estilizadas */}
        {tags.map((cat, index) => (
          <span 
            key={index} 
            className="flex items-center gap-1.5 bg-amber-500/10 text-amber-500 border border-amber-500/20 px-3 py-1 rounded-lg text-xs font-bold animate-in fade-in zoom-in duration-200"
          >
            {cat}
            <button 
              type="button" // Evita submeter o form ao clicar
              onClick={() => removeCategory(index)}
              className="hover:bg-amber-500/20 rounded-full p-0.5 transition-colors"
            >
              <X size={14} />
            </button>
          </span>
        ))}

        {/* Input que se mistura ao fundo */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? "Ex: Eletrônicos, Oferta..." : ""}
          className="flex-1 bg-transparent border-none outline-none text-white text-sm min-w-[120px] px-2"
        />
      </div>
      <p className="text-[10px] text-zinc-500 ml-1 italic">
        Pressione Enter ou vírgula para separar as categorias.
      </p>
    </div>
  );
}