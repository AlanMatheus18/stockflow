import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Card } from "./Card";

export function BalancoMensal() {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Coordenadas para o desenho da linha
  const points = "0,40 20,35 40,45 60,20 80,25 100,5";

  useEffect(() => {
    async function fetchFinanceiro() {
      try {
        setLoading(true);
        const { data } = await supabase
          .from("movements")
          .select("quantity, unit_price")
          .eq("type", "out");

        const soma = data?.reduce((acc, item) => acc + (item.quantity * (item.unit_price || 0)), 0) || 0;
        setTotal(soma);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchFinanceiro();
  }, []);

  return (
    <div className="w-full">
      <Card title="Balanço Mensal">
        {/* Ajustes: 
          1. 'flex-wrap' ou 'flex-col sm:flex-row' para telas muito pequenas.
          2. 'gap-4' para evitar que o texto encoste no gráfico.
        */}
        <div className="flex flex-row items-center justify-between w-full h-full pb-2 gap-4">
          
          {/* Lado Esquerdo: Valor */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <span className="text-emerald-400 text-lg sm:text-xl">↑</span>
            <div className="flex flex-col">
              <span className="text-zinc-100 font-bold text-base sm:text-xl whitespace-nowrap">
                {loading ? (
                  <div className="h-6 w-20 bg-zinc-800 animate-pulse rounded" />
                ) : (
                  `R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                )}
              </span>
              <span className="text-[10px] text-zinc-500 uppercase font-medium">Receita total</span>
            </div>
          </div>

          {/* Lado Direito: Gráfico de Linha */}
          {/* O container do gráfico agora cresce proporcionalmente com 'flex-1' mas tem um max-w */}
          <div className="flex-1 max-w-[120px] h-12 sm:h-16 relative flex items-center">
            <svg
              viewBox="0 0 100 50"
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              {/* Eixos simples */}
              <line x1="0" y1="50" x2="100" y2="50" stroke="#3f3f46" strokeWidth="1" />
              
              {/* Linha de tendência */}
              <polyline
                fill="none"
                stroke="#10b981" 
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
                className="drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]"
              />
              
              {/* Seta na ponta */}
              <path
                d="M 95 12 L 100 5 L 105 12"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </Card>
    </div>
  );
}