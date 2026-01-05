import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { supabase } from "../supabaseClient";
import { ArrowUpCircle, ArrowDownCircle, Calendar } from "lucide-react";

export const MovementTable = forwardRef((props, ref) => {
    const [movements, setMovements] = useState([]);
    const [loading, setLoading] = useState(true);

    // Permitir que o componente pai (o MovementPage) peça para atualizar a tabela
    useImperativeHandle(ref, () => ({
        fetchMovements
    }));

    useEffect(() => {
        fetchMovements();
    }, []);

    async function fetchMovements() {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('movements')
                .select(`
                id, 
                quantity, 
                type, 
                created_at, 
                products!movements_product_id_fkey ( name )
            `) // Adicionado o identificador da relação !movements_product_id_fkey
                .order('created_at', { ascending: false })
                .limit(10);

            if (error) throw error;
            setMovements(data || []);
        } catch (error) {
            console.error("Erro ao buscar histórico:", error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-zinc-800">
                <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                    <Calendar size={16} /> Histórico Recente
                </h3>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-zinc-500 text-[10px] uppercase border-b border-zinc-800">
                            <th className="p-4 font-semibold">Produto</th>
                            <th className="p-4 font-semibold text-center">Tipo</th>
                            <th className="p-4 font-semibold text-center">Qtd</th>
                            <th className="p-4 font-semibold text-right">Data</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="py-8 text-center text-zinc-500 text-sm">Carregando histórico...</td>
                            </tr>
                        ) : movements.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="py-8 text-center text-zinc-500 text-sm">Nenhuma movimentação registada.</td>
                            </tr>
                        ) : (
                            movements.map((move) => (
                                <tr key={move.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4 text-sm font-medium text-white">
                                        {move.products?.name || "Produto Removido"}
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase ${move.type === 'in'
                                                ? "bg-emerald-500/10 text-emerald-500"
                                                : "bg-red-500/10 text-red-500"
                                            }`}>
                                            {move.type === 'in' ? <ArrowUpCircle size={12} /> : <ArrowDownCircle size={12} />}
                                            {move.type === 'in' ? 'Entrada' : 'Saída'}
                                        </span>
                                    </td>
                                    <td className={`p-4 text-center text-sm font-bold ${move.type === 'in' ? "text-emerald-500" : "text-red-500"}`}>
                                        {move.type === 'in' ? '+' : '-'}{move.quantity}
                                    </td>
                                    <td className="p-4 text-right text-xs text-zinc-500">
                                        {new Date(move.created_at).toLocaleDateString('pt-PT')}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
});

export default MovementTable;