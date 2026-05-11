import { create } from "zustand";
import supabase from "../lib/util.jsx";

export const useProduct = create((set, get) => ({
  // ── Image state ──
  MainImageFile: null,
  MainImagePreview: null,
  OtherImageFile: [],
  OtherImagePreview: [],
  otherSlots: [0, 1],

  // ── Form state ──
  name: "",
  description: "",
  price: "",
  discount: "",
  category: "",
  rating: "",
  isFeatured: false,
  isNewArrival: false,
  tags: [],
  tagInput: "",
  colorAvailable: [],
  customColor: "#d4a373",
  size: "",

  // ── UI state ──
  loading: false,

  // ── Product list state ──
  selected: [],

  // ── Edit mode ──
  isEditing: false,
  editingId: null,

  // ── Image actions ──
  UploadMain: (e) => {
    const file = e.target.files[0];
    if (file) {
      set({
        MainImageFile: file,
        MainImagePreview: URL.createObjectURL(file),
      });
    }
  },

  UploadOthers: (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedFiles = [...get().OtherImageFile];
      const updatedPreviews = [...get().OtherImagePreview];
      updatedFiles[index] = file;
      updatedPreviews[index] = URL.createObjectURL(file);
      set({
        OtherImageFile: updatedFiles,
        OtherImagePreview: updatedPreviews,
      });
    }
  },

  addImageSlot: () => {
    const { otherSlots } = get();
    if (otherSlots.length < 3) {
      set({ otherSlots: [...otherSlots, otherSlots.length] });
    }
  },

  // ── Form actions ──
  handleChange: (e) => {
    const { name, value, type, checked } = e.target;
    set({ [name]: type === "checkbox" ? checked : value });
  },

  setSize: (s) => set((state) => ({ size: state.size === s ? "" : s })),

  setTagInput: (val) => set({ tagInput: val }),

  addTag: (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const { tagInput, tags } = get();
      const tag = tagInput.trim().toLowerCase();
      if (tag && !tags.includes(tag)) {
        set({ tags: [...tags, tag], tagInput: "" });
      } else {
        set({ tagInput: "" });
      }
    }
  },

  removeTag: (tag) => {
    set((state) => ({ tags: state.tags.filter((t) => t !== tag) }));
  },

  toggleColor: (color) => {
    const { colorAvailable } = get();
    set({
      colorAvailable: colorAvailable.find((c) => c.hex === color.hex)
        ? colorAvailable.filter((c) => c.hex !== color.hex)
        : [...colorAvailable, color],
    });
  },

  addCustomColor: (hex) => {
    const { colorAvailable } = get();
    if (!colorAvailable.find((c) => c.hex === hex)) {
      set({ colorAvailable: [...colorAvailable, { name: hex, hex }] });
    }
  },

  setCustomColor: (hex) => set({ customColor: hex }),

  setLoading: (val) => set({ loading: val }),

  // ── Edit — prefill form from existing product ──
  edit: (product) => {
    set({
      isEditing: true,
      editingId: product.id,
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      discount: product.discount || "",
      category: product.category || "",
      rating: product.rating || "",
      isFeatured: product.isFeatured || false,
      isNewArrival: product.isNewArrival || false,
      tags: product.tags || [],
      colorAvailable: product.colorAvailable || [],
      size: product.size || "",
      MainImagePreview: product.image || null,
      MainImageFile: null,
      OtherImagePreview: product.images || [],
      OtherImageFile: [],
      otherSlots: product.images?.length > 0
        ? product.images.map((_, i) => i)
        : [0, 1],
    });
  },

  // ── Reset form ──
  reset: () => {
    set({
      isEditing: false,
      editingId: null,
      name: "",
      description: "",
      price: "",
      discount: "",
      category: "",
      rating: "",
      isFeatured: false,
      isNewArrival: false,
      tags: [],
      tagInput: "",
      colorAvailable: [],
      customColor: "#d4a373",
      size: "",
      loading: false,
      MainImageFile: null,
      MainImagePreview: null,
      OtherImageFile: [],
      OtherImagePreview: [],
      otherSlots: [0, 1],
    });
  },

  // ── Product list actions ──
  toggleAll: (ids) => set({ selected: ids }),

  deleteSelected: () => set({ selected: [] }),

  deleteOne: (id) =>
    set((state) => ({
      selected: state.selected.filter((s) => s !== id),
    })),
}));
