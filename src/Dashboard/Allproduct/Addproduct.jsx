import { useState } from "react";

const CATEGORIES = ["Hoodie", "Premium", "Accessories"];
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
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    category: "",
    rating: "",
    isFeatured: false,
    isNewArrival: false,
    tags: [],
  });

  const [mainImage, setMainImage] = useState("");
  const [otherImages, setOtherImages] = useState(["", ""]);
  const [colors, setColors] = useState([]); // [{ name, hex }]
  const [sizes, setSizes] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [customColor, setCustomColor] = useState("#d4a373");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  // Tags
  const addTag = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const tag = tagInput.trim().toLowerCase();
      if (!form.tags.includes(tag)) {
        setForm((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
      }
      setTagInput("");
    }
  };
  const removeTag = (tag) => {
    setForm((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  // Colors — { name, hex } objects
  const toggleColor = (color) => {
    setColors((prev) =>
      prev.find((c) => c.hex === color.hex)
        ? prev.filter((c) => c.hex !== color.hex)
        : [...prev, color]
    );
  };

  // Sizes — multi toggle
  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // Other images
  const addImageSlot = () => {
    if (otherImages.length < 3) setOtherImages((prev) => [...prev, null]);
  };
  const updateOtherImage = (index, file) => {
    const url = file ? URL.createObjectURL(file) : null;
    setOtherImages((prev) => prev.map((img, i) => (i === index ? url : img)));
  };

  const handleSubmit = () => {
    const product = {
      id: `PRD-${String(Math.floor(Math.random() * 999) + 1).padStart(3, "0")}`,
      ...form,
      price: Number(form.price),
      discount: Number(form.discount),
      rating: Number(form.rating),
      sizes,
      colors,
      image: mainImage,
      otherImages: otherImages.filter(Boolean),
      reviewCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };
    console.log("Product payload:", product);
    alert("Product added! Check console for payload.");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Add Product</h2>
        <p className="text-gray-500 text-sm mt-1">Fill in the details to list a new product</p>
      </div>

      {/* Image Upload Section */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          Product Images
        </label>

        {/* Main image */}
        <label
          className="w-full h-64 rounded-xl bg-white/5 border border-white/10 overflow-hidden relative flex items-center justify-center cursor-pointer group"
          style={mainImage ? { backgroundImage: `url(${mainImage})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}
        >
          {!mainImage && (
            <div className="text-center pointer-events-none">
              <i className="fas fa-cloud-upload-alt text-3xl text-gray-600 mb-2 block" />
              <span className="text-gray-500 text-sm">Click to upload main image</span>
            </div>
          )}
          {mainImage && (
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="text-white text-sm"><i className="fas fa-redo mr-2" />Change Image</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) setMainImage(URL.createObjectURL(file));
            }}
          />
        </label>

        {/* Other images row */}
        <div className="flex gap-3">
          {otherImages.map((img, i) => (
            <label
              key={i}
              className="flex-1 h-24 rounded-xl bg-white/5 border border-white/10 overflow-hidden relative flex items-center justify-center cursor-pointer group"
              style={img ? { backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}
            >
              {!img && <i className="fas fa-image text-gray-600 text-lg pointer-events-none" />}
              {img && (
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <i className="fas fa-redo text-white text-sm" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) updateOtherImage(i, file);
                }}
              />
            </label>
          ))}

          {/* Add slot button */}
          {otherImages.length < 3 && (
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
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Oversized Black Essential Hoodie"
              className={inputCls}
            />
          </Field>
        </div>

        <div className="md:col-span-2">
          <Field label="Description">
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Describe the product..."
              className={inputCls + " resize-none"}
            />
          </Field>
        </div>

        <Field label="Price (₦)">
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="45000"
            className={inputCls}
          />
        </Field>

        <Field label="Discount (%)">
          <input
            name="discount"
            type="number"
            value={form.discount}
            onChange={handleChange}
            placeholder="23"
            className={inputCls}
          />
        </Field>

        <Field label="Category">
          <select name="category" value={form.category} onChange={handleChange} className={inputCls}>
            <option value="">Select category</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>

        <Field label="Sizes">
          <div className="flex flex-wrap gap-2">
            {["XS", "S", "M", "L", "XL", "XXL"].map((s, index) => (
              <button
                key={index}
                onClick={() => toggleSize(s)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  sizes.includes(s)
                    ? "bg-[#d4a373] text-black"
                    : "bg-white/5 border border-white/10 text-gray-300 hover:border-[#d4a373]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Rating (1–5)">
          <input
            name="rating"
            type="number"
            min="1"
            max="5"
            step="0.1"
            value={form.rating}
            onChange={handleChange}
            placeholder="4.5"
            className={inputCls}
          />
        </Field>
      </div>

      {/* Colors */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          Available Colors
        </label>
        <div className="flex gap-3 flex-wrap items-center">
          {PRESET_COLORS.map((color, index) => (
            <button
              key={index}
              onClick={() => toggleColor(color)}
              className="w-8 h-8 rounded-full transition-transform hover:scale-110 flex-shrink-0"
              style={{
                backgroundColor: color,
                border: color === "#ffffff" || color === "#F9A8D4" || color === "#86EFAC" || color === "#67E8F9" || color === "#FBBF24"
                  ? "1px solid rgba(255,255,255,0.15)"
                  : "none",
                outline: colors.includes(color) ? "2px solid #d4a373" : "2px solid transparent",
                outlineOffset: "2px",
              }}
            />
          ))}

          {/* Custom color picker circle */}
          <label
            className="w-8 h-8 rounded-full flex items-center justify-center border border-dashed border-white/30 hover:border-[#d4a373] transition-colors cursor-pointer flex-shrink-0 relative overflow-hidden"
            title="Pick custom color"
          >
            <i className="fas fa-plus text-[10px] text-gray-400" />
            <input
              type="color"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              onBlur={() => {
                if (!colors.includes(customColor)) {
                  setColors((prev) => [...prev, customColor]);
                }
              }}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
          </label>
        </div>

        {/* Selected colors preview */}
        {colors.length > 0 && (
          <div className="flex gap-2 flex-wrap items-center">
            <span className="text-xs text-gray-500">{colors.length} selected:</span>
            {colors.map((color, index) => (
              <button
                key={index}
                onClick={() => toggleColor(color)}
                className="w-5 h-5 rounded-full border border-white/20 hover:scale-110 transition-transform relative group"
                style={{ backgroundColor: color }}
                title={`Remove ${color}`}
              >
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 rounded-full text-[8px] text-white">✕</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          Tags
        </label>
        <div className="flex flex-wrap gap-2 p-3 rounded-xl bg-white/5 border border-white/10 min-h-[48px]">
          {form.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 px-3 py-1 bg-[#d4a373]/20 text-[#d4a373] text-xs rounded-full"
            >
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
            placeholder={form.tags.length === 0 ? 'Type a tag and press Enter e.g. "streetwear"' : "Add more..."}
            className="bg-transparent text-white text-sm outline-none flex-1 min-w-[120px] placeholder-gray-600"
          />
        </div>
      </div>

      {/* Toggles */}
      <div className="flex gap-6 flex-wrap">
        <Toggle
          label="Featured Product"
          name="isFeatured"
          checked={form.isFeatured}
          onChange={handleChange}
        />
        <Toggle
          label="New Arrival"
          name="isNewArrival"
          checked={form.isNewArrival}
          onChange={handleChange}
        />
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="w-full py-4 bg-[#d4a373] text-black font-bold rounded-xl hover:bg-[#c4935f] transition-colors text-sm tracking-wide"
      >
        ADD PRODUCT
      </button>
    </div>
  );
}

// Reusable field wrapper
function Field({ label, children }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
        {label}
      </label>
      {children}
    </div>
  );
}

// Reusable toggle
function Toggle({ label, name, checked, onChange }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div
          className={`w-11 h-6 rounded-full transition-colors ${
            checked ? "bg-[#d4a373]" : "bg-white/10"
          }`}
        />
        <div
          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </div>
      <span className="text-sm text-gray-300">{label}</span>
    </label>
  );
}

const inputCls =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none placeholder-gray-600 focus:border-[#d4a373] transition-colors";
