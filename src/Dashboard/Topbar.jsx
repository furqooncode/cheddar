export default function Topbar({ title }) {
  return (
    <header className="flex justify-between items-center p-6 bg-white/5
    backdrop-blur rounded-xl mb-6 w-full">
      <h2 className="text-xl text-white font-semibold">{title}</h2>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#d4a373]" />
        <span className="text-sm text-gray-300">Admin</span>
      </div>
    </header>
  );
}
