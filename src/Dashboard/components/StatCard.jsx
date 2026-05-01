export default function StatCard({ title, value }) {
  return (
    <div className="p-6 rounded-xl bg-white/5 backdrop-blur shadow-lg">
      <p className="text-sm uppercase text-gray-400">{title}</p>
      <p className="text-2xl font-bold text-[#d4a373] mt-2">{value}</p>
    </div>
  );
}