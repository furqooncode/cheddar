import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useProduct } from "../../Client/productData.jsx";
import supabase from "../../lib/util.jsx";

export default function ProductList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { edit, selected, toggleAll, deleteSelected, deleteOne } = useProduct();
  const [deletingId, setDeletingId] = useState(null);
  const [deletingBulk, setDeletingBulk] = useState(false);

  const { data: products = [], isPending, isError, error } = useQuery({
    queryKey: ["adminProducts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) throw error;
      return data;
    },
  });

  const allSelected = selected.length === products.length && products.length > 0;

  const handleToggleAll = () => {
    toggleAll(allSelected ? [] : products.map((p) => p.id));
  };

  const handleToggleOne = (id) => {
    const isSelected = selected.includes(id);
    toggleAll(isSelected ? selected.filter((s) => s !== id) : [...selected, id]);
  };

  const handleEdit = (product) => {
    edit(product);
    navigate("/dashboard/addproduct");
  };

  const handleDeleteOne = async (id) => {
    if (!confirm("Delete this product?")) return;
    setDeletingId(id);
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      deleteOne(id);
      queryClient.invalidateQueries(["adminProducts"]);
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteSelected = async () => {
    if (!confirm(`Delete ${selected.length} product(s)?`)) return;
    setDeletingBulk(true);
    try {
      const { error } = await supabase.from("products").delete().in("id", selected);
      if (error) throw error;
      deleteSelected();
      queryClient.invalidateQueries(["adminProducts"]);
    } catch (err) {
      console.error(err);
      alert("Bulk delete failed");
    } finally {
      setDeletingBulk(false);
    }
  };

  if (isPending) return (
    <div className="flex flex-col gap-4">
      {[1,2,3,4,5].map((i) => (
        <div key={i} className="h-16 rounded-xl bg-white/5 animate-pulse" />
      ))}
    </div>
  );

  if (isError) return <p className="text-red-400 text-sm">{error.message}</p>;

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
              onClick={handleDeleteSelected}
              disabled={deletingBulk}
              className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 text-sm hover:bg-red-500/20 transition-colors disabled:opacity-50"
            >
              {deletingBulk ? (
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                  Deleting...
                </span>
              ) : (
                <><i className="fas fa-trash mr-2" />Delete ({selected.length})</>
              )}
            </button>
          )}
          <button
            onClick={() => navigate("/dashboard/addproduct")}
            className="px-4 py-2 rounded-lg bg-[#d4a373] text-black text-sm font-semibold hover:bg-[#c4935f] transition-colors"
          >
            <i className="fas fa-plus mr-2" />Add Product
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-white/10 overflow-x-auto w-full">
        <table className="w-full min-w-[700px] text-sm">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="w-10 px-4 py-3 text-left">
                <input type="checkbox" checked={allSelected} onChange={handleToggleAll} className="w-4 h-4 accent-[#d4a373] cursor-pointer" />
              </th>
              <th className="w-10 px-2 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">#</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Product</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Category</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Price</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Sizes</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Colors</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Rating</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {products.map((p, index) => {
              const isSelected = selected.includes(p.id);
              const discountedPrice = p.discount
                ? p.price - (p.price * p.discount) / 100
                : p.price;
              const isDeleting = deletingId === p.id;
              const colors = p.colorAvailable || [];
              const sizes = Array.isArray(p.size) ? p.size : p.size ? [p.size] : [];

              return (
                <tr
                  key={p.id}
                  className={`transition-colors hover:bg-white/5 ${isSelected ? "bg-[#d4a373]/5" : "bg-transparent"} ${isDeleting ? "opacity-40" : ""}`}
                >
                  {/* Checkbox */}
                  <td className="px-4 py-3">
                    <input type="checkbox" checked={isSelected} onChange={() => handleToggleOne(p.id)} className="w-4 h-4 accent-[#d4a373] cursor-pointer" />
                  </td>

                  {/* Index */}
                  <td className="px-2 py-3 text-gray-600 text-xs font-mono">{index + 1}</td>

                  {/* Product */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0 bg-white/5" />
                      <div className="min-w-0">
                        <p className="text-white font-medium truncate max-w-[160px]">{p.name}</p>
                        <p className="text-gray-500 text-xs">{p.id}</p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-md bg-white/5 text-gray-300 text-xs">{p.category}</span>
                  </td>

                  {/* Price */}
                  <td className="px-4 py-3">
                    <p className="text-white font-medium">₦{discountedPrice.toLocaleString()}</p>
                    {p.discount > 0 && (
                      <p className="text-gray-500 text-xs line-through">₦{p.price.toLocaleString()}</p>
                    )}
                  </td>

                  {/* Sizes */}
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {sizes.slice(0, 3).map((s) => (
                        <span key={s} className="px-1.5 py-0.5 rounded text-[10px] bg-white/5 text-gray-400 border border-white/10">{s}</span>
                      ))}
                      {sizes.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-white/5 text-gray-500">+{sizes.length - 3}</span>
                      )}
                    </div>
                  </td>

                  {/* Colors */}
                  <td className="px-4 py-3">
                    <div className="flex gap-1 flex-wrap">
                      {colors.map((c, i) => (
                        <span
                          key={i}
                          title={c.name || c}
                          className="w-5 h-5 rounded-full border border-white/20 flex-shrink-0"
                          style={{ backgroundColor: c.hex || c }}
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
                      {p.isFeatured && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#d4a373]/20 text-[#d4a373] w-fit">Featured</span>
                      )}
                      {p.isNewArrival && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-500/20 text-blue-400 w-fit">New Arrival</span>
                      )}
                      {!p.isFeatured && !p.isNewArrival && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/5 text-gray-500 w-fit">Standard</span>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors flex items-center justify-center"
                        title="Edit"
                      >
                        <i className="fas fa-pen text-xs" />
                      </button>
                      <button
                        onClick={() => handleDeleteOne(p.id)}
                        disabled={isDeleting}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors flex items-center justify-center disabled:opacity-50"
                        title="Delete"
                      >
                        {isDeleting
                          ? <span className="w-3 h-3 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                          : <i className="fas fa-trash text-xs" />
                        }
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {products.length === 0 && (
              <tr>
                <td colSpan={10} className="px-4 py-16 text-center text-gray-600">
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
