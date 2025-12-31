import { Card } from "./Card";

export function UltimasMovimentacoes() {
  return (
    <Card title="Últimas Movimentações">
      <ul className="text-sm space-y-2">
        <li className="text-blue-400">SAÍDA: SKU-112 (10 un)</li>
        <li className="text-green-400">ENTRADA: SKU-9919 (10 un)</li>
        <li className="text-green-400">ENTRADA: SKU-2091 (60 un)</li>
        <li className="text-blue-400">SAÍDA: SKU-999 (50 un)</li>
        <li className="text-blue-400">SAÍDA: SKU-456 (15 un)</li>
      </ul>
    </Card>
  );
}
