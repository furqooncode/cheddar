import { useState } from "react";
import { products as initialProducts } from "../data/products";

export default function ProductList() {
  const [products, setProducts] = useState(initialProducts);
  const [selected, setSelected] = useState([]);

  const allSelected = selected.length === products.length && products.length > 0;

  const toggleAll = () => {
    setSelected(allSelected ? [] : products.map((p) => p.id));
  };

  const toggleOne = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const deleteSelected = () => {
    setProducts((prev) => prev.filter((p) => !selected.includes(p.id)));
    setSelected([]);
  };

  const deleteOne = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setSelected((prev) => prev.filter((i) => i !== id));
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-white">Products</h2>
          <p className="text-gray-500 text-sm">{products.length} items listed</p>
        </div>
        <div className="flex items-center gap-3">
          {selected.length > 0 && (
            <button
              onClick={deleteSelected}
              className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 text-sm hover:bg-red-500/20 transition-colors"
            >
              <i className="fas fa-trash mr-2" />
              Delete ({selected.length})
            </button>
          )}
          <button className="px-4 py-2 rounded-lg bg-[#d4a373] text-black text-sm font-semibold hover:bg-[#c4935f] transition-colors">
            <i className="fas fa-plus mr-2" />
            Add Product
          </button>
        </div>
      </div>

      {/* Table wrapper — horizontal scroll on mobile */}
      <div className="w-full overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="w-10 px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    className="w-4 h-4 accent-[#d4a373] cursor-pointer"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  Product
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  Sizes
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  Colors
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  Rating
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map((p) => {
                const isSelected = selected.includes(p.id);
                const discountedPrice = p.discount
                  ? p.price - (p.price * p.discount) / 100
                  : p.price;

                return (
                  <tr
                    key={p.id}
                    className={`transition-colors hover:bg-white/5 ${
                      isSelected ? "bg-[#d4a373]/5" : "bg-transparent"
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleOne(p.id)}
                        className="w-4 h-4 accent-[#d4a373] cursor-pointer"
                      />
                    </td>

                    {/* Product */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover flex-shrink-0 bg-white/5"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-white font-medium truncate">{p.name}</p>
                          <p className="text-gray-500 text-xs">{p.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-md bg-white/5 text-gray-300 text-xs">
                        {p.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-4 py-3">
                      <p className="text-white font-medium">
                        ₦{discountedPrice.toLocaleString()}
                      </p>
                      {p.discount > 0 && (
                        <p className="text-gray-500 text-xs line-through">
                          ₦{p.price.toLocaleString()}
                        </p>
                      )}
                    </td>

                    {/* Sizes */}
                    <td className="px-4 py-3 max-w-[130px]">
                      <div className="flex flex-wrap gap-1">
                        {p.sizes.slice(0, 3).map((s) => (
                          <span
                            key={s}
                            className="px-1.5 py-0.5 rounded text-[10px] bg-white/5 text-gray-400 border border-white/10"
                          >
                            {s}
                          </span>
                        ))}
                        {p.sizes.length > 3 && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-white/5 text-gray-500">
                            +{p.sizes.length - 3}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Colors */}
                    <td className="px-4 py-3 max-w-[100px]">
                      <div className="flex gap-1 flex-wrap">
                        {p.colors.map((c) => (
                          <span
                            key={c.name}
                            title={c.name}
                            className="w-5 h-5 rounded-full border border-white/20 flex-shrink-0"
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                      </div>
                    </td>

                    {/* Rating */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <i className="fas fa-star text-[#d4a373] text-xs" />
                        <span className="text-white text-xs">{p.rating}</span>
                        <span className="text-gray-600 text-xs">({p.reviewCount})</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        {p.bestSeller && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#d4a373]/20 text-[#d4a373] w-fit">
                            Best Seller
                          </span>
                        )}
                        {p.isNewArrival && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-500/20 text-blue-400 w-fit">
                            New Arrival
                          </span>
                        )}
                        {!p.bestSeller && !p.isNewArrival && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/5 text-gray-500 w-fit">
                            Standard
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors flex items-center justify-center"
                          title="Edit"
                        >
                          <i className="fas fa-pen text-xs" />
                        </button>
                        <button
                          onClick={() => deleteOne(p.id)}
                          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors flex items-center justify-center"
                          title="Delete"
                        >
                          <i className="fas fa-trash text-xs" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {products.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-16 text-center text-gray-600">
                    <i className="fas fa-box-open text-3xl mb-3 block" />
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
      </div>
    </div>
  );
}