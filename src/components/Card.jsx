export function Card({ title, children, borderColor = "border-zinc-700" }) {
  return (
    <div className={`bg-zinc-900/80 border ${borderColor} rounded-xl p-5`}>
      <h3 className="text-xl text-red-600 mb-3">{title}</h3>
      {children}
    </div>
  );
}