import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Card } from "./Card";

export function ProdutosMaisVendidos() {
  const [tops, setTops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTopVendas() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("movements")
          .select("sku, quantity, type")
          .eq("type", "out")
          .order("quantity", { ascending: false })
          .limit(3);

        if (error) throw error;
        setTops(data || []);
      } catch (err) {
        console.error("Erro ao buscar mais vendidos:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTopVendas();
  }, []);

  // Encontra o valor máximo para calcular a largura das barras proporcionalmente
  const maxVendas = tops.length > 0 ? Math.max(...tops.map(t => t.quantity)) : 0;

  return (
    <div className="w-full">
      <Card title="Produtos Mais Vendidos" borderColor="border-blue-500/50">
        <div className="relative h-full min-h-[140px]">
          {loading ? (
            <div className="space-y-4 mt-2">
              <div className="h-4 bg-zinc-800 animate-pulse rounded w-3/4" />
              <div className="h-4 bg-zinc-800 animate-pulse rounded w-1/2" />
            </div>
          ) : tops.length > 0 ? (
            <ul className="text-sm text-zinc-300 space-y-4 mt-2">
              {tops.map((item, index) => {
                // Cálculo da largura da barra (porcentagem relativa ao líder de vendas)
                const barWidth = maxVendas > 0 ? (item.quantity / maxVendas) * 100 : 0;

                return (
                  <li key={index} className="flex flex-col gap-1">
                    <div className="flex justify-between text-[11px] sm:text-xs">
                      <span className="font-mono text-zinc-100 truncate pr-2">
                        {index + 1}. {item.sku}
                      </span>
                      <span className="text-blue-400 font-bold shrink-0">
                        {item.quantity} un.
                      </span>
                    </div>
                    {/* Barra de progresso visual */}
                    <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-blue-500 h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-zinc-500 text-xs italic">Sem dados de venda.</p>
          )}

          {/* Ícone decorativo ajustado para não sobrepor o texto em telas pequenas */}
          <div className="absolute -bottom-2 -right-2 opacity-10 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
              <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
            </svg>
          </div>
        </div>
      </Card>
    </div>
  );
}