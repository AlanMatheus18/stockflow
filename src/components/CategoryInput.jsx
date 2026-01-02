import React, { useState } from 'react';

export function CategoryInput() {
  const [categories, setCategories] = useState(['Eletrônicos']);
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault();
      if (!categories.includes(inputValue.trim())) {
        setCategories([...categories, inputValue.trim()]);
      }
      setInputValue('');
    }
  };

  const removeCategory = (indexToRemove) => {
    setCategories(categories.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-2">
        Categorias
      </label>
      
      <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-white focus-within:ring-2 focus-within:ring-blue-500 border-gray-300">
        {/* Renderização das Tags */}
        {categories.map((cat, index) => (
          <span 
            key={index} 
            className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
          >
            {cat}
            <button 
              onClick={() => removeCategory(index)}
              className="ml-2 hover:text-blue-900 font-bold"
            >
              &times;
            </button>
          </span>
        ))}

        {/* Input Invisível que cresce com o texto */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={categories.length === 0 ? "Ex: Verão, Promoção..." : ""}
          className="flex-1 outline-none min-w-[120px] text-sm py-1"
        />
      </div>
    </div>
  );
};