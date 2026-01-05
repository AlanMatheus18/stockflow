import React, { useState } from 'react';
import { supabase } from "../supabaseClient";

const ProductEntry = ({ onMovementRegistered }) => {
    // Estados para controlar o modo e os inputs
    const [isEntrada, setIsEntrada] = useState(true);
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!nome || !quantidade) {
            alert("Por favor, preencha o nome e a quantidade.");
            return;
        }

        setLoading(true);
        try {
            // 1. Buscar o produto pelo nome para pegar o ID e o estoque atual
            // Adicione 'sku' e 'sale_price' na seleção para que eles existam no objeto 'produto'
            const { data: produto, error: fetchError } = await supabase
                .from('products')
                .select('id, quantity, sku, sale_price') // Adicionado sku e sale_price aqui
                .ilike('name', nome)
                .single();

            if (fetchError || !produto) {
                alert("Produto não encontrado!");
                return;
            }

            const qtdNum = parseInt(quantidade);
            const tipo = isEntrada ? 'in' : 'out';

            // 2. Registrar na tabela 'movements'
            // No momento de inserir na tabela 'movements'
            const { error: moveError } = await supabase
                .from('movements')
                .insert([{
                    product_id: produto.id,
                    sku: produto.sku, // Adicione o SKU para manter a relação configurada
                    quantity: qtdNum,
                    type: tipo,
                    unit_price: isEntrada ? 0 : (produto.sale_price || 0) // Salva o preço para o Balanço Mensal
                }]);

            if (moveError) throw moveError;

            // 3. Atualizar o estoque na tabela 'products'
            const novoEstoque = isEntrada
                ? produto.quantity + qtdNum
                : produto.quantity - qtdNum;

            const { error: updateError } = await supabase
                .from('products')
                .update({ quantity: novoEstoque })
                .eq('id', produto.id);

            if (updateError) throw updateError;

            alert(`${isEntrada ? 'Entrada' : 'Saída'} registrada com sucesso!`);

            // Limpar campos e atualizar tabela pai
            setNome('');
            setQuantidade('');
            if (onMovementRegistered) onMovementRegistered();

        } catch (error) {
            console.error("Erro:", error.message);
            alert("Erro ao processar movimentação.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 w-full max-w-2xl bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
            {/* Seletores de Modo */}
            <div className='flex gap-2'>
                <button
                    onClick={() => setIsEntrada(true)}
                    className={`px-8 py-2 rounded-md font-bold transition-all duration-200 min-w-[140px] ${isEntrada
                        ? "bg-[#3d97c9] text-white shadow-lg scale-105"
                        : "bg-transparent text-gray-400 border border-zinc-700 hover:bg-white/5"
                        }`}
                >
                    Entrada
                </button>

                <button
                    onClick={() => setIsEntrada(false)}
                    className={`px-8 py-2 rounded-md font-bold transition-all duration-200 min-w-[140px] ${!isEntrada
                        ? "bg-red-500 text-white shadow-lg scale-105"
                        : "bg-transparent text-gray-400 border border-zinc-700 hover:bg-white/5"
                        }`}
                >
                    Saída
                </button>
            </div>

            {/* Inputs e Botão de Registro */}
            <div className="flex flex-col sm:flex-row gap-3 items-end">
                <div className="flex-1 w-full">
                    <label className="text-xs text-zinc-500 mb-1 block uppercase font-bold">Produto</label>
                    <input
                        type="text"
                        placeholder="Ex: iPhone 15"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-white outline-none focus:border-amber-500"
                    />
                </div>

                <div className="w-full sm:w-32">
                    <label className="text-xs text-zinc-500 mb-1 block uppercase font-bold">Qtd</label>
                    <input
                        type="number"
                        placeholder="0"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-white outline-none focus:border-amber-500"
                    />
                </div>

                <button
                    onClick={handleRegister}
                    disabled={loading}
                    className={`px-6 py-2 rounded-lg font-extrabold transition-all active:scale-95 disabled:opacity-50 h-[42px] min-w-[180px] ${isEntrada ? "bg-emerald-500 text-emerald-950" : "bg-red-500 text-white"
                        }`}
                >
                    {loading ? "PROCESSANDO..." : isEntrada ? "REGISTRAR ENTRADA" : "REGISTRAR SAÍDA"}
                </button>
            </div>
        </div>
    );
}

export default ProductEntry;