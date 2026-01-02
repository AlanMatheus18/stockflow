import React from 'react';

const ButtonCancel = ({ onClick, disabled = false }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="px-6 py-2 rounded-md bg-[#373c43] text-gray-300 font-semibold hover:bg-[#454a52] active:bg-[#2d3137] transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Cancelar
    </button>
  );
};

export default ButtonCancel;