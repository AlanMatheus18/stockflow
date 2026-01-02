import React from 'react';

export function PriceStockFields({ formData, onChange }) {
  return (
    <div className="bg-[#1e2124] p-6 rounded-lg w-full">
      {/* Container Grid: 1 col no mobile, 4 cols no desktop */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Preço de Custo */}
        <div className="flex flex-col group">
          <label className="text-gray-400 text-xs font-semibold mb-1 uppercase tracking-tight">
            Preço de Custo
          </label>
          <div className="relative border-b border-gray-600 group-focus-within:border-blue-500 transition-colors">
            <span className="absolute left-0 top-2 text-gray-500 text-sm">R$</span>
            <input 
              type="number"
              name="costPrice"
              value={formData.costPrice}
              onChange={onChange}
              placeholder="0,00"
              className="w-full bg-transparent pl-7 py-2 text-gray-200 outline-none appearance-none"
            />
          </div>
        </div>

        {/* Preço de Venda */}
        <div className="flex flex-col group">
          <label className="text-gray-400 text-xs font-semibold mb-1 uppercase tracking-tight">
            Preço de Venda
          </label>
          <div className="relative border-b border-gray-600 group-focus-within:border-blue-500 transition-colors">
            <span className="absolute left-0 top-2 text-gray-500 text-sm">R$</span>
            <input 
              type="number"
              name="sellPrice"
              value={formData.sellPrice}
              onChange={onChange}
              placeholder="0,00"
              className="w-full bg-transparent pl-7 py-2 text-gray-200 outline-none"
            />
          </div>
        </div>

        {/* Estoque Atual */}
        <div className="flex flex-col group">
          <label className="text-gray-400 text-xs font-semibold mb-1 uppercase tracking-tight">
            Estoque Atual
          </label>
          <div className="border-b border-gray-600 group-focus-within:border-blue-500 transition-colors">
            <input 
              type="number"
              name="currentStock"
              value={formData.currentStock}
              onChange={onChange}
              placeholder="0"
              className="w-full bg-transparent py-2 text-gray-200 outline-none"
            />
          </div>
        </div>

        {/* Estoque Mínimo */}
        <div className="flex flex-col group">
          <label className="text-gray-400 text-xs font-semibold mb-1 uppercase tracking-tight">
            Estoque Mínimo
          </label>
          <div className="border-b border-gray-600 group-focus-within:border-blue-500 transition-colors">
            <input 
              type="number"
              name="minStock"
              value={formData.minStock}
              onChange={onChange}
              placeholder="0"
              className="w-full bg-transparent py-2 text-gray-200 outline-none"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default PriceStockFields;