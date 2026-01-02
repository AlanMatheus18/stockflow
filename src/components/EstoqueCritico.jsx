import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Card } from "./Card";

export function EstoqueCritico() {
  const [produtosCriticos, setProdutosCriticos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estado para as estatísticas globais
  const [stats, setStats] = useState({
    totalItens: 0,
    valorEstoque: 0,
    itensCriticos: 0
  });

  useEffect(() => {
    async function carregarDados() {
      try {
        setLoading(true);
        // Buscamos todos os produtos uma única vez para calcular as estatísticas
        const { data, error } = await supabase.from('products').select('*');
        
        if (error) throw error;

        if (data) {
          // 1. Cálculos Globais
          const total = data.length;
          const valor = data.reduce((acc, item) => acc + (item.cost_price * item.quantity), 0);
          
          // 2. Filtramos os itens que estão abaixo do SEU PRÓPRIO min_stock
          const itensAbaixoDoMinimo = data.filter(item => item.quantity <= item.min_stock);
          
          setStats({ 
            totalItens: total, 
            valorEstoque: valor, 
            itensCriticos: itensAbaixoDoMinimo.length 
          });

          // 3. Pegamos os 5 mais críticos (menor quantidade) para exibir no Card
          const top5Criticos = [...itensAbaixoDoMinimo]
            .sort((a, b) => a.quantity - b.quantity)
            .slice(0, 5);

          setProdutosCriticos(top5Criticos);
        }
      } catch (error) {
        console.error("Erro ao carregar dados do Dashboard:", error.message);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, []);

  return (
    <div className="w-full">
      <Card title="Estoque Crítico" borderColor="border-red-500">
        {loading ? (
          <div className="flex flex-col gap-2">
            <div className="h-10 w-full bg-zinc-800 animate-pulse rounded" />
            <div className="h-10 w-full bg-zinc-800 animate-pulse rounded" />
          </div>
        ) : produtosCriticos.length > 0 ? (
          <ul className="text-sm text-zinc-300 space-y-3">
            {produtosCriticos.map((produto) => (
              <li key={produto.sku} className="flex justify-between items-center border-b border-zinc-800 pb-2 last:border-0">
                <div className="flex flex-col pr-2 truncate">
                  <span className="font-medium text-zinc-100 truncate">
                    {produto.name}
                  </span>
                  <span className="text-[10px] text-zinc-500 uppercase">
                    SKU: {produto.sku}
                  </span>
                </div>
                <span className="flex-shrink-0 text-red-500 font-bold bg-red-500/10 px-2.5 py-1 rounded-md border border-red-500/20">
                  {produto.quantity}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-4">
            <p className="text-emerald-500 text-sm font-medium">Estoque em dia!</p>
            <p className="text-zinc-500 text-[10px]">Todos os itens estão acima do estoque mínimo.</p>
          </div>
        )}
      </Card>
    </div>
  );
}