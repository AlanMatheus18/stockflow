import { Card } from "./Card";

export function BalancoMensal() {
  return (
    <Card title="Balanço Mensal">
      <div className="flex items-end justify-between">
        <span className="text-green-400 font-semibold">↑ R$ 12.500</span>

        <div className="flex items-end gap-1">
          {[20, 30, 25, 40, 55].map((h, i) => (
            <div
              key={i}
              style={{ height: h }}
              className="w-2 bg-green-400 rounded"
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
