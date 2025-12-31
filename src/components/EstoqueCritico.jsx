import { Card } from "./Card";

export function EstoqueCritico() {
  return (
    <div className="w-60">
    <Card title="Estoque Crítico" borderColor="border-red-500">
      <ul className="text-sm text-zinc-300 space-y-2">
        <li className="text-amber-300">SKU-789: Parafuso - 15 un.</li>
        <li>SKU-321: Resistor - 40 un.</li>
        <li>SKU-555: Fio Azul - 8 un.</li>
      </ul>
    </Card>
    </div>
  );
}
