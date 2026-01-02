import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { CardMovi } from "./CardMovi";

export function UltimasMovimentacoes() {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovimentacoes() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("movements") 
          .select("id, type, sku, quantity, created_at")
          .order("created_at", { ascending: false })
          .limit(5);

        if (error) throw error;
        setMovimentacoes(data || []);
      } catch (error) {
        console.error("Erro ao carregar movimentações:", error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMovimentacoes();
  }, []);

  return (
    /* Adicionamos w-full para respeitar o grid pai */
    <div className="w-full">
      <CardMovi title="Últimas Movimentações">
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-8 bg-zinc-800/50 animate-pulse rounded" />
            ))}
          </div>
        ) : movimentacoes.length > 0 ? (
          <ul className="text-sm space-y-3">
            {movimentacoes.map((mov) => {
              const isEntrada = mov.type === 'in' || mov.type === 'ENTRADA';
              
              return (
                <li 
                  key={mov.id} 
                  className="flex justify-between items-center border-b border-zinc-800/50 pb-2 last:border-0 gap-2"
                >
                  {/* Badge Responsivo */}
                  <span className={`font-bold text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded min-w-[60px] text-center shrink-0 ${
                    isEntrada 
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                      : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  }`}>
                    {isEntrada ? "ENTRADA" : "SAÍDA"}
                  </span>
                  
                  {/* SKU com ajuste de overflow */}
                  <span className="text-zinc-300 flex-1 font-mono text-xs truncate">
                    {mov.sku}
                  </span>
                  
                  {/* Quantidade */}
                  <span className="text-zinc-400 font-medium text-xs shrink-0">
                    {mov.quantity} un
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="py-4 text-center">
            <p className="text-zinc-500 text-xs italic">Nenhuma movimentação registrada.</p>
          </div>
        )}
      </CardMovi>
    </div>
  );
}