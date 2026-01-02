import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { supabase } from "../supabaseClient";
import { Pencil, Trash2, Package, ChevronLeft, ChevronRight } from "lucide-react";

export const ProductTable = forwardRef((props, ref) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    fetchProducts();
  }, [page]);

 
  useImperativeHandle(ref, () => ({
    fetchProducts
  }));

  async function fetchProducts() {
    setLoading(true);
    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("name", { ascending: true })
        .range(from, to);

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    /* p-4 no mobile, p-6 no desktop */
    <div className="bg-zinc-900 p-4 md:p-6 rounded-xl border border-zinc-800 shadow-2xl w-full">
      
      {/* Container com scroll horizontal para não quebrar o layout do site */}
      <div className="overflow-x-auto overflow-y-hidden custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[600px] md:min-w-full">
          <thead>
            <tr className="text-zinc-400 text-xs md:text-sm border-b border-zinc-800 uppercase tracking-wider">
              <th className="pb-4 font-semibold px-2 md:px-4">Nome</th>
              {/* Oculto no Mobile, visível no Tablet (md:) em diante */}
              <th className="pb-4 font-semibold hidden md:table-cell">Categoria</th>
              <th className="pb-4 font-semibold hidden lg:table-cell">Custo</th>
              <th className="pb-4 font-semibold">Venda</th>
              <th className="pb-4 font-semibold text-center">Estoque</th>
              <th className="pb-4 font-semibold text-right px-4">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {loading ? (
              <tr>
                <td colSpan="6" className="py-10 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-zinc-500 text-sm">Carregando estoque...</span>
                  </div>
                </td>
              </tr>
            ) : products.map((product) => (
              <tr key={product.id} className="text-zinc-300 hover:bg-zinc-800/40 transition-colors group">
                <td className="py-4 px-2 md:px-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-white text-sm md:text-base">{product.name}</span>
                    <span className="text-[10px] text-zinc-500 md:hidden uppercase">{product.category}</span>
                  </div>
                </td>
                <td className="py-4 text-zinc-400 text-sm hidden md:table-cell">{product.category}</td>
                <td className="py-4 text-sm hidden lg:table-cell text-zinc-500">R$ {product.cost_price?.toFixed(2)}</td>
                <td className="py-4 text-sm font-medium">R$ {product.sale_price?.toFixed(2)}</td>
                <td className="py-4 text-center">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    product.quantity < 10 ? "bg-red-500/10 text-red-400" : "bg-emerald-500/10 text-emerald-400"
                  }`}>
                    {product.quantity}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex justify-end gap-2 md:gap-3 text-zinc-500">
                    <button className="hover:text-amber-400 p-1"><Pencil size={16} /></button>
                    <button className="hover:text-red-500 p-1"><Trash2 size={16} /></button>
                    <button className="hover:text-blue-400 p-1"><Package size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginação Responsiva */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-800 pt-6">
        <span className="text-xs text-zinc-500">Mostrando {products.length} produtos</span>
        
        <div className="flex items-center gap-1 md:gap-2">
          <button 
            onClick={() => setPage(p => Math.max(1, p - 1))}
            className="p-2 text-zinc-400 hover:bg-zinc-800 rounded-lg transition-colors border border-zinc-800"
          >
            <ChevronLeft size={18} />
          </button>
          
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`w-8 h-8 md:w-10 md:h-10 rounded-lg text-xs md:text-sm font-medium transition-all ${
                  page === num ? "bg-amber-500 text-zinc-950 font-bold" : "text-zinc-400 hover:bg-zinc-800"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => setPage(p => p + 1)}
            className="p-2 text-zinc-400 hover:bg-zinc-800 rounded-lg transition-colors border border-zinc-800"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
});
export default ProductTable;