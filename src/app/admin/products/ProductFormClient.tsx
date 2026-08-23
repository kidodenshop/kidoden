"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAdminLoader } from "@/context/AdminLoaderContext";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface InventoryItem {
  size: string;
  stockQuantity: number;
}

interface ProductInput {
  id?: string;
  name: string;
  description: string;
  price: number; // in Rupees
  categoryId: string;
  imageUrl: string;
  images?: string[];
  ageRange?: string | null;
  gender?: string | null;
  features: string[];
  isFeatured?: boolean;
  inventory?: InventoryItem[];
}

interface ProductFormClientProps {
  categories: Category[];
  product?: ProductInput;
}

export default function ProductFormClient({
  categories,
  product,
}: ProductFormClientProps) {
  const router = useRouter();
  const isEditMode = !!product;

  const { setIsPending, setPendingMessage } = useAdminLoader();

  // Form Fields
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price !== undefined ? product.price.toString() : "");
  const [categoryId, setCategoryId] = useState(product?.categoryId || "");
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || "");
  const [ageRange, setAgeRange] = useState(product?.ageRange || "");
  const [gender, setGender] = useState(product?.gender || "");
  const [isFeatured, setIsFeatured] = useState(product?.isFeatured || false);

  // Images list state
  const [images, setImages] = useState<string[]>(product?.images || (product?.imageUrl ? [product.imageUrl] : []));
  const [customImageUrl, setCustomImageUrl] = useState("");

  const addImageUrl = (url: string) => {
    const trimmed = url.trim();
    if (trimmed && !images.includes(trimmed)) {
      const updated = [...images, trimmed];
      setImages(updated);
      if (!imageUrl) {
        setImageUrl(trimmed);
      }
    }
  };

  const removeImageUrl = (idx: number) => {
    const targetUrl = images[idx];
    const updated = images.filter((_, i) => i !== idx);
    setImages(updated);
    if (imageUrl === targetUrl) {
      setImageUrl(updated[0] || "");
    }
  };

  // Features list state
  const [features, setFeatures] = useState<string[]>(product?.features || []);
  const [newFeature, setNewFeature] = useState("");

  // Inventory sizing state
  const [inventory, setInventory] = useState<InventoryItem[]>(product?.inventory || []);
  const [customSize, setCustomSize] = useState("");
  const [customStock, setCustomStock] = useState("10");

  // Operational states
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Pre-load default sizes based on chosen category
  const loadDefaultSizes = () => {
    const selectedCat = categories.find((c) => c.id === categoryId);
    if (!selectedCat) return;

    if (selectedCat.slug === "clothing") {
      setInventory([
        { size: "2-3 Years", stockQuantity: 10 },
        { size: "3-4 Years", stockQuantity: 10 },
        { size: "5-6 Years", stockQuantity: 10 },
        { size: "7-8 Years", stockQuantity: 10 },
      ]);
    } else {
      setInventory([{ size: "Standard", stockQuantity: 15 }]);
    }
  };

  // Auto-suggest load size button when category changes and inventory is empty
  useEffect(() => {
    if (inventory.length === 0 && categoryId) {
      loadDefaultSizes();
    }
  }, [categoryId]);

  // Image upload handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);
    setPendingMessage("Uploading product image to server...");
    setIsPending(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.url) {
        addImageUrl(data.url);
        setSuccess("Image uploaded successfully!");
      } else {
        setError(data.error || "Image upload failed.");
      }
    } catch (err) {
      setError("An unexpected error occurred during image upload.");
    } finally {
      setUploading(false);
      setIsPending(false);
    }
  };

  // Add a bullet feature
  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature("");
    }
  };

  // Remove a feature
  const removeFeature = (idx: number) => {
    setFeatures(features.filter((_, i) => i !== idx));
  };

  // Add custom size stock
  const addCustomSizeStock = () => {
    if (!customSize.trim()) return;
    const stockVal = parseInt(customStock) || 0;

    // Check if size already exists, if so update it, else append
    const existingIdx = inventory.findIndex(
      (inv) => inv.size.toLowerCase() === customSize.trim().toLowerCase()
    );

    if (existingIdx > -1) {
      const updated = [...inventory];
      updated[existingIdx].stockQuantity = stockVal;
      setInventory(updated);
    } else {
      setInventory([...inventory, { size: customSize.trim(), stockQuantity: stockVal }]);
    }

    setCustomSize("");
    setCustomStock("10");
  };

  // Update size stock directly in the list
  const updateSizeStock = (idx: number, quantity: number) => {
    const updated = [...inventory];
    updated[idx].stockQuantity = Math.max(0, quantity);
    setInventory(updated);
  };

  // Delete size stock from the list
  const deleteSizeStock = (idx: number) => {
    setInventory(inventory.filter((_, i) => i !== idx));
  };

  // Submit form (Save / Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSubmitting(true);

    if (!imageUrl || images.length === 0) {
      setError("Please upload at least one image and select it as the main cover image.");
      setSubmitting(false);
      return;
    }

    setPendingMessage(isEditMode ? "Saving changes to product listing..." : "Publishing new product to storefront catalog...");
    setIsPending(true);

    // Auto-include any feature currently typed in the input box but not added yet
    const finalFeatures = [...features];
    if (newFeature.trim() && !finalFeatures.includes(newFeature.trim())) {
      finalFeatures.push(newFeature.trim());
      setFeatures(finalFeatures);
      setNewFeature("");
    }

    const payload = {
      name,
      description,
      price: parseFloat(price),
      categoryId,
      imageUrl,
      images, // Send the full images array to DB
      ageRange: ageRange || null,
      gender: gender || null,
      features: finalFeatures,
      isFeatured,
      inventory,
    };

    try {
      const endpoint = isEditMode ? `/api/admin/products/${product.id}` : "/api/admin/products";
      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(isEditMode ? "Product updated successfully!" : "Product created successfully!");
        router.push("/admin/products");
        router.refresh();
      } else {
        setError(data.error || "Failed to save product.");
        setIsPending(false); // only disable if staying on page
      }
    } catch (err) {
      setError("An unexpected error occurred while saving the product.");
      setIsPending(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-brand-mint/20 rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-brand-navy/2">
      {success && (
        <div className="p-4 mb-6 bg-brand-mint/10 border border-brand-mint/30 rounded-2xl text-xs font-bold text-brand-mint animate-scale-up">
          🎉 {success}
        </div>
      )}
      {error && (
        <div className="p-4 mb-6 bg-brand-red/10 border border-brand-red/30 rounded-2xl text-xs font-bold text-brand-red animate-scale-up">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Core Product Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-xs font-black text-brand-navy uppercase tracking-widest mb-2">
                Product Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-5 py-4 bg-white/50 border border-brand-navy/10 rounded-2xl focus:outline-none focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/20 transition-all font-semibold text-brand-navy text-sm placeholder-brand-navy/30"
                placeholder="Mickey Friends Vest..."
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-black text-brand-navy uppercase tracking-widest mb-2">
                Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                className="w-full px-5 py-4 bg-white/50 border border-brand-navy/10 rounded-2xl focus:outline-none focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/20 transition-all font-semibold text-brand-navy text-sm placeholder-brand-navy/30 resize-none"
                placeholder="A detailed product description..."
              />
            </div>

            {/* Price & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-brand-navy uppercase tracking-widest mb-2">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="w-full px-5 py-4 bg-white/50 border border-brand-navy/10 rounded-2xl focus:outline-none focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/20 transition-all font-semibold text-brand-navy text-sm placeholder-brand-navy/30"
                  placeholder="599.00"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-brand-navy uppercase tracking-widest mb-2">
                  Category *
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  required
                  className="w-full px-5 py-4 bg-white/50 border border-brand-navy/10 rounded-2xl focus:outline-none focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/20 transition-all font-bold text-brand-navy text-sm"
                >
                  <option value="" disabled>Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Age Range & Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-brand-navy uppercase tracking-widest mb-2">
                  Age Range
                </label>
                <input
                  type="text"
                  value={ageRange}
                  onChange={(e) => setAgeRange(e.target.value)}
                  className="w-full px-5 py-4 bg-white/50 border border-brand-navy/10 rounded-2xl focus:outline-none focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/20 transition-all font-semibold text-brand-navy text-sm placeholder-brand-navy/30"
                  placeholder="e.g. 2-8 years"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-brand-navy uppercase tracking-widest mb-2">
                  Gender Target
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-5 py-4 bg-white/50 border border-brand-navy/10 rounded-2xl focus:outline-none focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/20 transition-all font-bold text-brand-navy text-sm"
                >
                  <option value="">Unspecified</option>
                  <option value="boy">Boy</option>
                  <option value="girl">Girl</option>
                  <option value="unisex">Unisex</option>
                </select>
              </div>
            </div>

            {/* Featured */}
            <div className="flex items-center gap-3 p-4 bg-brand-yellow/5 border border-brand-yellow/15 rounded-2xl">
              <input
                id="isFeatured"
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-5 h-5 accent-brand-orange rounded-md cursor-pointer border-brand-navy/10"
              />
              <label
                htmlFor="isFeatured"
                className="text-xs font-black text-brand-navy uppercase tracking-widest cursor-pointer select-none"
              >
                ★ Feature this product on main slider/banner
              </label>
            </div>
          </div>

          {/* Right Column: Sizing Stocks & Image Uploads */}
          <div className="space-y-6">
            {/* Image Preview & Upload */}
            <div>
              <label className="block text-xs font-black text-brand-navy uppercase tracking-widest mb-2">
                Product Gallery & Images *
              </label>
              
              <div className="space-y-4">
                {/* Upload drag-n-drop area */}
                <div className="border-2 border-dashed border-brand-mint/45 rounded-[2rem] p-6 text-center bg-brand-mint/2 flex flex-col items-center justify-center relative hover:bg-brand-mint/5 transition-all">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        Array.from(files).forEach(async (file) => {
                          setError(null);
                          setUploading(true);
                          setPendingMessage(`Uploading ${file.name}...`);
                          setIsPending(true);

                          const formData = new FormData();
                          formData.append("file", file);

                          try {
                            const res = await fetch("/api/admin/upload", {
                              method: "POST",
                              body: formData,
                            });
                            const data = await res.json();
                            if (res.ok && data.url) {
                              addImageUrl(data.url);
                            } else {
                              setError(data.error || `Upload failed for ${file.name}`);
                            }
                          } catch (err) {
                            setError(`Failed to upload ${file.name}`);
                          } finally {
                            setUploading(false);
                            setIsPending(false);
                          }
                        });
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    disabled={uploading}
                  />
                  <span className="p-3 bg-brand-mint/15 text-brand-mint rounded-full mb-3">
                    {uploading ? (
                      <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.008 1.24l.885 1.77a2.25 2.25 0 0 0 2.007 1.24h1.98a2.25 2.25 0 0 0 2.007-1.24l.885-1.77a2.25 2.25 0 0 1 2.007-1.24h3.86m-18 0h18M2.25 13.5l1.98-7.93A2.25 2.25 0 0 1 6.44 3.75h11.12a2.25 2.25 0 0 1 2.21 1.82l1.98 7.93m-18 0v5.625C2.25 20.375 3.875 22 5.875 22h12.25c2 0 3.625-1.625 3.625-3.625V13.5" />
                      </svg>
                    )}
                  </span>
                  <p className="text-xs font-black text-brand-navy uppercase tracking-widest">
                    {uploading ? "Uploading file..." : "Click or drag to upload gallery images"}
                  </p>
                  <p className="text-[10px] font-bold text-brand-navy/40 mt-1">
                    Multiple files allowed (PNG, JPEG, WebP, SVG)
                  </p>
                </div>

                {/* Direct image url input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (customImageUrl.trim()) {
                          addImageUrl(customImageUrl.trim());
                          setCustomImageUrl("");
                        }
                      }
                    }}
                    className="flex-grow px-4 py-3 bg-white/50 border border-brand-navy/10 rounded-2xl focus:outline-none focus:border-brand-pink text-xs font-semibold text-brand-navy placeholder-brand-navy/30"
                    placeholder="Paste external image URL and click Add"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (customImageUrl.trim()) {
                        addImageUrl(customImageUrl.trim());
                        setCustomImageUrl("");
                      }
                    }}
                    className="px-4 py-3 bg-brand-navy hover:bg-brand-navy/90 text-white font-bold rounded-2xl text-xs transition-all active:scale-[0.98]"
                  >
                    Add
                  </button>
                </div>

                {/* Gallery Preview Grid */}
                {images.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-[10px] font-black text-brand-navy/60 uppercase tracking-widest">
                      Uploaded Gallery ({images.length} images)
                    </p>
                    <div className="grid grid-cols-3 gap-3 p-4 bg-brand-navy/2 border border-brand-navy/5 rounded-3xl">
                      {images.map((img, idx) => {
                        const isCover = img === imageUrl;
                        return (
                          <div
                            key={idx}
                            className={`relative aspect-[4/5] rounded-2xl overflow-hidden border-2 transition-all group bg-white shadow-xs ${
                              isCover ? "border-brand-pink shadow-md scale-102" : "border-brand-navy/5 hover:border-brand-pink/55"
                            }`}
                          >
                            <Image
                              src={img}
                              alt={`Gallery ${idx + 1}`}
                              fill
                              className="object-cover"
                            />
                            
                            {/* Hover Actions Overlays */}
                            <div className="absolute inset-0 bg-brand-navy/40 backdrop-blur-xs flex flex-col justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                type="button"
                                onClick={() => removeImageUrl(idx)}
                                className="self-end p-1.5 bg-brand-red/90 text-white rounded-lg hover:scale-105 active:scale-95 transition-transform"
                                title="Remove Image"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9 9m-4.788-1.042 1.489-.25a1.144 1.144 0 0 0-.137-1.258V6a1.875 1.875 0 0 0-1.875-1.875h-3.75A1.875 1.875 0 0 0 6 6v.152c0 .065-.021.13-.062.18l-1.489-.25ZM9.75 6.75H14.25v-1.5H9.75v1.5Zm0 0v1.5M6 18.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V7.5H6v11.25Z" />
                                </svg>
                              </button>

                              <button
                                type="button"
                                onClick={() => setImageUrl(img)}
                                className={`w-full py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider text-center transition-all ${
                                  isCover
                                    ? "bg-brand-yellow text-brand-navy shadow-sm"
                                    : "bg-white/90 text-brand-navy hover:bg-white"
                                }`}
                              >
                                {isCover ? "★ Main Cover" : "Make Cover"}
                              </button>
                            </div>

                            {/* Cover Badge (Always visible on cover) */}
                            {isCover && (
                              <span className="absolute top-1.5 left-1.5 bg-brand-yellow text-brand-navy font-black text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
                                Cover
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bullet Point Features */}
            <div>
              <label className="block text-xs font-black text-brand-navy uppercase tracking-widest mb-2">
                Why You'll Love It (Features & Fabric details)
              </label>
              
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addFeature();
                      }
                    }}
                    className="flex-grow px-4 py-3 bg-white/50 border border-brand-navy/10 rounded-2xl focus:outline-none focus:border-brand-pink text-xs font-semibold text-brand-navy placeholder-brand-navy/30"
                    placeholder="e.g. 100% Organic Cotton"
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-4 py-3 bg-brand-navy hover:bg-brand-navy/90 text-white font-bold rounded-2xl text-xs transition-all active:scale-[0.98]"
                  >
                    Add
                  </button>
                </div>

                {features.length > 0 && (
                  <div className="flex flex-wrap gap-2 p-4 bg-brand-navy/2 border border-brand-navy/5 rounded-2xl max-h-48 overflow-y-auto">
                    {features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="flex items-center gap-2 text-[10px] font-bold text-brand-navy bg-white border border-brand-navy/10 pl-3 pr-2 py-1.5 rounded-full select-none"
                      >
                        <span>{feature}</span>
                        <button
                          type="button"
                          onClick={() => removeFeature(idx)}
                          className="text-brand-red/60 hover:text-brand-red font-black text-xs"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Sizing stock section */}
        <div className="border-t border-brand-mint/15 pt-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-lg font-black text-brand-navy tracking-tight mb-1">
                Sizing & Stock Quantities *
              </h3>
              <p className="text-xs font-semibold text-brand-navy/55">
                Define the available sizes and their respective stock counts.
              </p>
            </div>
            
            {categoryId && (
              <button
                type="button"
                onClick={loadDefaultSizes}
                className="text-xs font-black text-brand-pink hover:text-brand-pink/90 bg-brand-pink/5 hover:bg-brand-pink/10 border border-brand-pink/15 px-4 py-2.5 rounded-2xl transition-all self-start sm:self-auto active:scale-[0.98]"
              >
                🔄 Load Template Sizes
              </button>
            )}
          </div>

          {/* Add custom Sizing inputs */}
          <div className="flex flex-wrap gap-3 items-end p-5 bg-brand-mint/5 border border-brand-mint/15 rounded-3xl">
            <div className="w-full sm:w-auto flex-grow max-w-sm">
              <label className="block text-[10px] font-black text-brand-navy/60 uppercase tracking-widest mb-1.5">
                Size Label
              </label>
              <input
                type="text"
                value={customSize}
                onChange={(e) => setCustomSize(e.target.value)}
                placeholder="e.g. 2-3 Years, Newborn"
                className="w-full px-4 py-3 bg-white border border-brand-mint/20 rounded-2xl text-xs font-semibold text-brand-navy focus:outline-none"
              />
            </div>
            
            <div className="w-28">
              <label className="block text-[10px] font-black text-brand-navy/60 uppercase tracking-widest mb-1.5">
                Stock Qty
              </label>
              <input
                type="number"
                min="0"
                value={customStock}
                onChange={(e) => setCustomStock(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-brand-mint/20 rounded-2xl text-xs font-semibold text-brand-navy focus:outline-none"
              />
            </div>

            <button
              type="button"
              onClick={addCustomSizeStock}
              className="py-3 px-6 bg-brand-navy hover:bg-brand-navy/90 text-white font-bold rounded-2xl text-xs transition-all active:scale-[0.98]"
            >
              Add Size
            </button>
          </div>

          {/* Sizing Inventory List */}
          {inventory.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-brand-navy/10 rounded-3xl text-xs font-bold text-brand-navy/40">
              No size stock records added yet. Define sizes above or load templates.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {inventory.map((inv, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white border border-brand-mint/20 rounded-2xl flex items-center justify-between shadow-sm group hover:border-brand-mint/45 transition-colors"
                >
                  <div>
                    <p className="text-xs font-black text-brand-navy">{inv.size}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] font-bold text-brand-navy/50">Stock:</span>
                      <input
                        type="number"
                        min="0"
                        value={inv.stockQuantity}
                        onChange={(e) => updateSizeStock(idx, parseInt(e.target.value) || 0)}
                        className="w-16 px-2 py-1 bg-brand-mint/5 border border-brand-mint/15 rounded-md text-xs font-bold text-brand-navy text-center focus:outline-none"
                      />
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => deleteSizeStock(idx)}
                    className="p-2 text-brand-red/60 hover:text-brand-red hover:bg-brand-red/5 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                    title="Remove Size"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9 9m-4.788-1.042 1.489-.25a1.144 1.144 0 0 0-.137-1.258V6a1.875 1.875 0 0 0-1.875-1.875h-3.75A1.875 1.875 0 0 0 6 6v.152c0 .065-.021.13-.062.18l-1.489-.25ZM9.75 6.75H14.25v-1.5H9.75v1.5Zm0 0v1.5M6 18.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V7.5H6v11.25Z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Actions */}
        <div className="border-t border-brand-mint/15 pt-8 flex flex-col sm:flex-row justify-end gap-4">
          <Link
            href="/admin/products"
            className="w-full sm:w-auto py-4 px-8 bg-brand-navy/5 hover:bg-brand-navy/10 text-brand-navy font-bold rounded-2xl border border-brand-navy/10 text-center text-sm active:scale-[0.98] select-none"
          >
            Cancel & Go Back
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto py-4 px-8 bg-brand-navy hover:bg-brand-navy/95 text-white font-black rounded-2xl text-sm transition-all shadow-lg shadow-brand-navy/15 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving Product...
              </>
            ) : isEditMode ? (
              "Save Changes"
            ) : (
              "Create Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
