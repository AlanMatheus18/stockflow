import React from 'react';

const ButtonSave = ({ onClick, isLoading = false }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={isLoading}
      className="px-8 py-2 rounded-md bg-[#4da8da] text-white font-bold hover:bg-[#3d97c9] active:scale-95 transition-all duration-200 shadow-lg disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span>Salvando...</span>
        </>
      ) : (
        'Salvar Produto'
      )}
    </button>
  );
};

export default ButtonSave;