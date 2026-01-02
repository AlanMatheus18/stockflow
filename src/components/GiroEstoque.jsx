import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export function GiroEstoque() {
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(true);

  const stroke = 8;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  useEffect(() => {
    async function calcularGiro() {
      try {
        setLoading(true);
        const { data: produtos } = await supabase.from("products").select("quantity");
        const estoqueAtual = produtos?.reduce((acc, item) => acc + item.quantity, 0) || 0;

        const { data: movimentacoes } = await supabase
          .from("movements")
          .select("quantity")
          .eq("type", "out");

        const totalSaidas = movimentacoes?.reduce((acc, item) => acc + item.quantity, 0) || 0;

        if (estoqueAtual + totalSaidas > 0) {
          const calculo = (totalSaidas / (estoqueAtual + totalSaidas)) * 100;
          setPercent(Math.round(calculo));
        }
      } catch (error) {
        console.error("Erro ao calcular giro:", error);
      } finally {
        setLoading(false);
      }
    }
    calcularGiro();
  }, []);

  return (
    /* ALTERAÇÃO: 'w-full' para ocupar a coluna do grid.
       'h-full' para manter a consistência de altura com os outros cards.
    */
    <div className="bg-zinc-900/80 border border-zinc-700 rounded-xl p-5 flex flex-col items-center justify-center w-full min-h-[220px]">
      
      {/* Container do SVG: relativo para o texto centralizado e com tamanho máximo controlado */}
      <div className="relative w-28 h-28 sm:w-32 sm:h-32">
        <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#27272a"
            strokeWidth={stroke}
            fill="none"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke={percent > 50 ? "#4ade80" : "#fbbf24"}
            strokeWidth={stroke}
            fill="none"
            strokeDasharray={circumference}
            style={{ 
              strokeDashoffset: offset,
              transition: "stroke-dashoffset 0.8s ease-out" 
            }}
            strokeLinecap="round"
          />
        </svg>

        <span className="absolute inset-0 flex items-center justify-center text-xl sm:text-2xl font-bold text-zinc-100">
          {loading ? (
            <div className="w-8 h-8 border-2 border-zinc-700 border-t-zinc-400 rounded-full animate-spin" />
          ) : (
            `${percent}%`
          )}
        </span>
      </div>

      <div className="text-center mt-4">
        <p className="text-sm font-semibold text-zinc-100">Giro de Estoque</p>
        <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium">
          Eficiência de Saída
        </p>
      </div>
    </div>
  );
}