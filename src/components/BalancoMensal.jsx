import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Card } from "./Card";

export function BalancoMensal() {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Coordenadas estáticas para o gráfico (pode ser mantido assim por enquanto)
  const points = "0,40 20,35 40,45 60,20 80,25 100,5";

  useEffect(() => {
    async function fetchFinanceiro() {
      try {
        setLoading(true);
        
        // 1. Buscamos as movimentações de saída
        // IMPORTANTE: Verifique se o nome da coluna no banco é 'unit_price' ou apenas 'price'
        const { data, error } = await supabase
          .from("movements")
          .select("quantity, unit_price") 
          .eq("type", "out");

        if (error) throw error;

        if (data) {
          // 2. Cálculo garantindo que valores nulos não quebrem a conta
          const soma = data.reduce((acc, item) => {
            const qtd = item.quantity || 0;
            const preco = item.unit_price || 0;
            return acc + (qtd * preco);
          }, 0);
          
          setTotal(soma);
        }
      } catch (error) {
        console.error("Erro ao calcular balanço:", error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchFinanceiro();
  }, []);

  return (
    <div className="w-full">
      <Card title="Balanço Mensal">
        <div className="flex flex-row items-center justify-between w-full h-full pb-2 gap-4">
          
          {/* Lado Esquerdo: Valor Financeiro */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <span className="text-emerald-400 text-lg sm:text-xl font-bold">↑</span>
            <div className="flex flex-col">
              <span className="text-zinc-100 font-bold text-base sm:text-xl whitespace-nowrap">
                {loading ? (
                  <div className="h-6 w-24 bg-zinc-800 animate-pulse rounded" />
                ) : (
                  // Formatação para Moeda Brasileira
                  new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(total)
                )}
              </span>
              <span className="text-[10px] text-zinc-500 uppercase font-medium tracking-wider">
                Receita Total (Saídas)
              </span>
            </div>
          </div>

          {/* Lado Direito: Gráfico Visual */}
          <div className="flex-1 max-w-[100px] md:max-w-[120px] h-12 sm:h-16 relative flex items-center">
            <svg
              viewBox="0 0 100 50"
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              <line x1="0" y1="50" x2="100" y2="50" stroke="#3f3f46" strokeWidth="1" />
              <polyline
                fill="none"
                stroke="#10b981" 
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
                className="drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]"
              />
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