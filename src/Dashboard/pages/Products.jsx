import { products } from "../data/products";
export default function Products() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {products.map((p) => (
        <div key={p.id} className="p-6 rounded-xl bg-white/5">
          <h3 className="text-lg text-white font-semibold">{p.name}</h3>
          <p className="text-[#d4a373]">₦{p.basePrice}</p>
          <div className="flex gap-2 mt-3">
            {p.colors.map((c) => (
              <span
                key={c.name}
                className="w-5 h-5 rounded-full"
                style={{ background: c.hex }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
