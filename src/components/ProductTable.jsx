import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { supabase } from "../supabaseClient";
import { Pencil, Trash2, Package, ChevronLeft, ChevronRight } from "lucide-react";

export const ProductTable = forwardRef((props, ref) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 7;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [page]);


  useImperativeHandle(ref, () => ({
    fetchProducts
  }));

  async function fetchProducts(searchQuery = "") {
    setLoading(true);
    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    try {
      let query = supabase
        .from("products")
        .select("*")
        .order("name", { ascending: true })
        .range(from, to);

      // SE houver algo digitado na busca, adiciona o filtro
      if (searchQuery) {
        query = query.ilike('name', `%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id, name) {
    const confirmed = window.confirm(`Tem certeza que deseja excluir o produto "${name}"?`);

    if (confirmed) {
      try {
        const { error } = await supabase
          .from("products")
          .delete()
          .eq("id", id); // Filtra pelo ID correto

        if (error) throw error;

        // Atualiza a tabela após excluir
        fetchProducts();
        alert("Produto excluído com sucesso!");
      } catch (error) {
        alert("Erro ao excluir: " + error.message);
      }
    }
  }

  async function handleUpdateProduct(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("products")
        .update({
          name: editingProduct.name,
          category: editingProduct.category,
          cost_price: parseFloat(editingProduct.cost_price),
          sale_price: parseFloat(editingProduct.sale_price),
          quantity: parseInt(editingProduct.quantity),
        })
        .eq("id", editingProduct.id);

      if (error) throw error;

      alert("Produto atualizado com sucesso!");
      setIsEditModalOpen(false);
      fetchProducts(); // Recarrega a tabela
    } catch (error) {
      alert("Erro ao atualizar produto: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  const registrarSaida = async (product) => {
    const qtdSaida = window.prompt(`Quantas unidades de ${product.name} saíram?`);

    if (qtdSaida) {
      // 1. Registrar na tabela de movimentos
      await supabase.from('movements').insert([
        {
          product_id: product.id,
          quantity: parseInt(qtdSaida),
          type: 'out'
        }
      ]);

      // 2. Atualizar o estoque na tabela de produtos (Subtrair)
      const novoEstoque = product.quantity - parseInt(qtdSaida);
      await supabase.from('products').update({ quantity: novoEstoque }).eq('id', product.id);

      fetchProducts(); // Recarrega a tabela
      alert("Saída registrada!");
    }
  };
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
                  <span className={`px-2 py-1 rounded text-xs font-bold ${product.quantity < 10 ? "bg-red-500/10 text-red-400" : "bg-emerald-500/10 text-emerald-400"
                    }`}>
                    {product.quantity}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex justify-end gap-2 md:gap-3 text-zinc-500">
                    <button onClick={() => {
                      setEditingProduct(product);
                      setIsEditModalOpen(true);
                    }}
                      className="hover:text-amber-400 p-1 transition-colors"
                      title="Editar Produto"><Pencil size={16} /></button>
                    <button onClick={() => handleDelete(product.id, product.name)}
                      className="hover:text-red-500 p-1 transition-colors"
                      title="Excluir"><Trash2 size={16} /></button>
                    <button onClick={() => navigate('/movements', { state: { productId: product.id } })}
                      className="hover:text-blue-400 p-1 transition-colors"
                      title="Ir para Movimentações"
                    ><Package size={16} /></button>
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
          {isEditModalOpen && editingProduct && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl w-full max-w-md shadow-2xl">
                <h2 className="text-xl font-bold text-white mb-4">Editar Produto</h2>

                <form onSubmit={handleUpdateProduct} className="space-y-4">
                  <div>
                    <label className="text-xs text-zinc-500 block mb-1 uppercase">Nome</label>
                    <input
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-white focus:border-amber-500 outline-none"
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs text-zinc-500 block mb-1 uppercase">Categoria</label>
                    <input
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-white focus:border-amber-500 outline-none"
                      value={editingProduct.category}
                      onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-zinc-500 block mb-1 uppercase">Preço Custo</label>
                      <input
                        type="number" step="0.01"
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-white focus:border-amber-500 outline-none"
                        value={editingProduct.cost_price}
                        onChange={(e) => setEditingProduct({ ...editingProduct, cost_price: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-zinc-500 block mb-1 uppercase">Preço Venda</label>
                      <input
                        type="number" step="0.01"
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-white focus:border-amber-500 outline-none"
                        value={editingProduct.sale_price}
                        onChange={(e) => setEditingProduct({ ...editingProduct, sale_price: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-zinc-500 block mb-1 uppercase">Quantidade em Estoque</label>
                    <input
                      type="number"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-white focus:border-amber-500 outline-none"
                      value={editingProduct.quantity}
                      onChange={(e) => setEditingProduct({ ...editingProduct, quantity: e.target.value })}
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                      className="flex-1 px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-amber-500 text-zinc-950 font-bold rounded-lg hover:bg-amber-600 transition"
                    >
                      Salvar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}


          <div className="flex items-center gap-1">
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`w-8 h-8 md:w-10 md:h-10 rounded-lg text-xs md:text-sm font-medium transition-all ${page === num ? "bg-amber-500 text-zinc-950 font-bold" : "text-zinc-400 hover:bg-zinc-800"
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