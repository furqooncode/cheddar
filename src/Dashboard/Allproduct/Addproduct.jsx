import { useNavigate } from "react-router-dom";
import { useProduct } from "../../Client/productData.jsx";
import supabase from "../../lib/util.jsx";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const PRESET_COLORS = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#ffffff" },
  { name: "Charcoal", hex: "#1C1C1E" },
  { name: "Ash", hex: "#3A3A3C" },
  { name: "Navy", hex: "#1a3a6b" },
  { name: "Blue", hex: "#2563EB" },
  { name: "Sky", hex: "#0EA5E9" },
  { name: "Ice", hex: "#67E8F9" },
  { name: "Burgundy", hex: "#8B2F2F" },
  { name: "Red", hex: "#DC2626" },
  { name: "Orange", hex: "#F97316" },
  { name: "Yellow", hex: "#FBBF24" },
  { name: "Forest", hex: "#2d5a27" },
  { name: "Green", hex: "#16A34A" },
  { name: "Mint", hex: "#86EFAC" },
  { name: "Gold", hex: "#d4a373" },
  { name: "Purple", hex: "#7C3AED" },
  { name: "Pink", hex: "#EC4899" },
  { name: "Blush", hex: "#F9A8D4" },
  { name: "Brown", hex: "#A16207" },
];

export default function AddProduct() {
  const navigate = useNavigate();
  const {
    MainImagePreview, OtherImagePreview,
    MainImageFile, OtherImageFile,
    UploadMain, UploadOthers,
    otherSlots, addImageSlot,
    name, description, price, discount, category,
    rating, isFeatured, isNewArrival, tags,
    tagInput, colorAvailable, customColor, size,
    handleChange, setSize, toggleColor,
    addCustomColor, setCustomColor,
    setTagInput, addTag, removeTag,
    loading, setLoading, reset,
    isEditing, editingId,
  } = useProduct();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let mainUrl = MainImagePreview; // reuse existing if editing and no new file

      // Upload main image if new file selected
      if (MainImageFile) {
        const mainFileName = `products/${Date.now()}-${MainImageFile.name}`;
        const { error: mainUploadError } = await supabase.storage
          .from("cheddar-storage")
          .upload(mainFileName, MainImageFile);
        if (mainUploadError) throw mainUploadError;
        const { data: mainData } = supabase.storage
          .from("cheddar-storage")
          .getPublicUrl(mainFileName);
        mainUrl = mainData.publicUrl;
      }

      // Upload other images — skip slots that have no new file
      const otherUrls = await Promise.all(
        OtherImageFile.map(async (file, i) => {
          if (file) {
            const fileName = `products/${Date.now()}-${file.name}`;
            const { error } = await supabase.storage
              .from("cheddar-storage")
              .upload(fileName, file);
            if (error) throw error;
            const { data } = supabase.storage
              .from("cheddar-storage")
              .getPublicUrl(fileName);
            return data.publicUrl;
          }
          // Reuse existing preview URL if no new file
          return OtherImagePreview[i] || null;
        })
      );

      const payload = {
        name,
        description,
        price: Number(price),
        discount: Number(discount),
        category,
        rating: Number(rating),
        isFeatured,
        isNewArrival,
        tags,
        colorAvailable,
        size,
        image: mainUrl,
        images: otherUrls.filter(Boolean),
        reviewCount: 0,
      };

      if (isEditing) {
        const { error } = await supabase
          .from("products")
          .update(payload)
          .eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;
      }

      reset();
      navigate("/dashboard/products");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16 relative">

      {/* Full page loading overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4"
          style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
        >
          <div className="w-14 h-14 rounded-full border-4 border-white/10 border-t-[#d4a373] animate-spin" />
          <p className="text-white text-sm font-semibold tracking-wide">
            {isEditing ? "Saving changes..." : "Uploading product..."}
          </p>
          <p className="text-gray-400 text-xs">Please don't close this page</p>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          {isEditing ? "Edit Product" : "Add Product"}
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          {isEditing ? "Update the product details below" : "Fill in the details to list a new product"}
        </p>
      </div>

      {/* Images */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          Product Images
        </label>

        {/* Main image */}
        <label
          className="w-full h-64 rounded-xl bg-white/5 border border-white/10 overflow-hidden relative flex items-center justify-center cursor-pointer group"
          style={
            MainImagePreview
              ? { backgroundImage: `url(${MainImagePreview})`, backgroundSize: "cover", backgroundPosition: "center" }
              : {}
          }
        >
          {MainImagePreview && (
            <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#d4a373] flex items-center justify-center z-10">
              <i className="fas fa-check text-black text-xs" />
            </div>
          )}
          {!MainImagePreview && (
            <div className="text-center pointer-events-none">
              <i className="fas fa-cloud-upload-alt text-3xl text-gray-600 mb-2 block" />
              <span className="text-gray-500 text-sm">Click to upload main image</span>
            </div>
          )}
          {MainImagePreview && (
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="text-white text-sm"><i className="fas fa-redo mr-2" />Change Image</span>
            </div>
          )}
          <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" onChange={UploadMain} />
        </label>

        {/* Other images */}
        <div className="flex gap-3">
          {otherSlots.map((_, i) => {
            const preview = OtherImagePreview[i];
            return (
              <label
                key={i}
                className="flex-1 h-24 rounded-xl bg-white/5 border border-white/10 overflow-hidden relative flex items-center justify-center cursor-pointer group"
                style={preview ? { backgroundImage: `url(${preview})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}
              >
                {preview && (
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#d4a373] flex items-center justify-center z-10">
                    <i className="fas fa-check text-black text-[8px]" />
                  </div>
                )}
                {!preview && <i className="fas fa-image text-gray-600 text-lg pointer-events-none" />}
                {preview && (
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <i className="fas fa-redo text-white text-sm" />
                  </div>
                )}
                <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" onChange={(e) => UploadOthers(e, i)} />
              </label>
            );
          })}

          {otherSlots.length < 3 && (
            <button
              onClick={addImageSlot}
              className="h-24 w-24 flex-shrink-0 rounded-xl border border-dashed border-white/20 flex items-center justify-center text-gray-500 hover:border-[#d4a373] hover:text-[#d4a373] transition-colors"
            >
              <i className="fas fa-plus text-xl" />
            </button>
          )}
        </div>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Field label="Product Name">
            <input name="name" value={name} onChange={handleChange} placeholder="e.g. Oversized Black Essential Hoodie" className={inputCls} />
          </Field>
        </div>

        <div className="md:col-span-2">
          <Field label="Description">
            <textarea name="description" value={description} onChange={handleChange} rows={3} placeholder="Describe the product..." className={inputCls + " resize-none"} />
          </Field>
        </div>

        <Field label="Price (₦)">
          <input name="price" type="number" value={price} onChange={handleChange} placeholder="45000" className={inputCls} />
        </Field>

        <Field label="Discount (%)">
          <input name="discount" type="number" value={discount} onChange={handleChange} placeholder="23" className={inputCls} />
        </Field>

        <Field label="Category">
          <input name="category" value={category} onChange={handleChange} placeholder="e.g. Hoodie, Trousers, Polo..." className={inputCls} />
        </Field>

        <Field label="Size (pick one)">
          <div className="flex flex-wrap gap-2">
            {SIZES.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  size === s ? "bg-[#d4a373] text-black" : "bg-white/5 border border-white/10 text-gray-300 hover:border-[#d4a373]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Rating (1–5)">
          <input name="rating" type="number" min="1" max="5" step="0.1" value={rating} onChange={handleChange} placeholder="4.5" className={inputCls} />
        </Field>
      </div>

      {/* Colors */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Available Colors</label>
        <div className="flex gap-3 flex-wrap items-center">
          {PRESET_COLORS.map((color) => (
            <button
              key={color.hex}
              onClick={() => toggleColor(color)}
              className="w-8 h-8 rounded-full transition-transform hover:scale-110 flex-shrink-0 relative"
              style={{
                backgroundColor: color.hex,
                border: ["#ffffff", "#F9A8D4", "#86EFAC", "#67E8F9", "#FBBF24"].includes(color.hex) ? "1px solid rgba(255,255,255,0.15)" : "none",
                outline: colorAvailable.find((c) => c.hex === color.hex) ? "2px solid #d4a373" : "2px solid transparent",
                outlineOffset: "2px",
              }}
              title={color.name}
            >
              {colorAvailable.find((c) => c.hex === color.hex) && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <i className="fas fa-check text-[8px] text-white drop-shadow" />
                </span>
              )}
            </button>
          ))}

          <label
            className="w-8 h-8 rounded-full flex items-center justify-center border border-dashed border-white/30 hover:border-[#d4a373] transition-colors cursor-pointer flex-shrink-0 relative overflow-hidden"
            title="Pick custom color"
          >
            <i className="fas fa-plus text-[10px] text-gray-400" />
            <input
              type="color"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              onBlur={() => addCustomColor(customColor)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
          </label>
        </div>

        {colorAvailable.length > 0 && (
          <div className="flex gap-2 flex-wrap items-center">
            <span className="text-xs text-gray-500">{colorAvailable.length} selected:</span>
            {colorAvailable.map((color) => (
              <button
                key={color.hex}
                onClick={() => toggleColor(color)}
                className="w-5 h-5 rounded-full border border-white/20 hover:scale-110 transition-transform relative group"
                style={{ backgroundColor: color.hex }}
                title={`Remove ${color.name}`}
              >
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 rounded-full text-[8px] text-white">✕</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Tags</label>
        <div className="flex flex-wrap gap-2 p-3 rounded-xl bg-white/5 border border-white/10 min-h-[48px]">
          {tags.map((tag) => (
            <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-[#d4a373]/20 text-[#d4a373] text-xs rounded-full">
              #{tag}
              <button onClick={() => removeTag(tag)} className="ml-1 hover:text-white transition-colors">
                <i className="fas fa-times text-[10px]" />
              </button>
            </span>
          ))}
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={addTag}
            placeholder={tags.length === 0 ? 'Type a tag and press Enter e.g. "streetwear"' : "Add more..."}
            className="bg-transparent text-white text-sm outline-none flex-1 min-w-[120px] placeholder-gray-600"
          />
        </div>
      </div>

      {/* Toggles */}
      <div className="flex gap-6 flex-wrap">
        <Toggle label="Featured Product" name="isFeatured" checked={isFeatured} onChange={handleChange} />
        <Toggle label="New Arrival" name="isNewArrival" checked={isNewArrival} onChange={handleChange} />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        {isEditing && (
          <button
            onClick={() => { reset(); navigate("/dashboard/products"); }}
            className="flex-1 py-4 bg-white/5 border border-white/10 text-gray-300 font-bold rounded-xl hover:bg-white/10 transition-colors text-sm tracking-wide"
          >
            Cancel
          </button>
        )}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1 py-4 bg-[#d4a373] text-black font-bold rounded-xl hover:bg-[#c4935f] transition-colors text-sm tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isEditing ? "SAVE CHANGES" : "ADD PRODUCT"}
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{label}</label>
      {children}
    </div>
  );
}

function Toggle({ label, name, checked, onChange }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div className="relative">
        <input type="checkbox" name={name} checked={checked} onChange={onChange} className="sr-only" />
        <div className={`w-11 h-6 rounded-full transition-colors ${checked ? "bg-[#d4a373]" : "bg-white/10"}`} />
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`} />
      </div>
      <span className="text-sm text-gray-300">{label}</span>
    </label>
  );
}

const inputCls =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none placeholder-gray-600 focus:border-[#d4a373] transition-colors";
