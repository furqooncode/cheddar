export default function Sidebar({ page, setPage }) {
  const items = ["Overview", "Orders", "Products"];
  return (
    <aside className="w-64 bg-[#070707] text-white h-screen p-6">
      <h1 className="text-2xl font-bold text-[#d4a373] mb-8">CHEDDAR</h1>
      {items.map((i) => (
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`block w-full text-left px-4 py-3 rounded-lg mb-2 ${page === i ? "bg-[#d4a373] text-black" : "hover:bg-white/10"}`}
        >
          {i}
        </button>
      ))}
    </aside>
  );
}
