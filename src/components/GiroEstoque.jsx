export function GiroEstoque() {
  const percent = 85;
  const stroke = 8;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="bg-zinc-900/80 border border-zinc-700 rounded-xl p-5 flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg
          className="w-full h-full rotate-[-90deg]"
          viewBox="0 0 120 120"
        >
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
            stroke="#4ade80"
            strokeWidth={stroke}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>

        {/* Texto central */}
        <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-green-400">
          {percent}%
        </span>
      </div>

      <p className="text-sm text-zinc-400 mt-2">Giro de Estoque</p>
    </div>
  );
}
