"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface InventoryItem {
  size: string;
  stockQuantity: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  isFeatured: boolean;
  gender: string | null;
  ageRange: string | null;
  category: Category;
  inventory: InventoryItem[];
}

interface ProductsListClientProps {
  initialProducts: Product[];
  categories: Category[];
}

import { useAdminLoader } from "@/context/AdminLoaderContext";

export default function ProductsListClient({
  initialProducts,
  categories,
}: ProductsListClientProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { setIsPending, setPendingMessage } = useAdminLoader();
  const router = useRouter();

  // Filter products based on search term and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category.id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id: string) => {
    setError(null);
    setSuccess(null);
    setDeleteLoading(true);
    setPendingMessage("Deleting product from catalog...");
    setIsPending(true);

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setProducts(products.filter((p) => p.id !== id));
        setSuccess("Product deleted successfully.");
        setDeletingId(null);
        router.refresh();
      } else {
        setError(data.error || "Failed to delete product.");
      }
    } catch (err) {
      setError("An unexpected error occurred while deleting.");
    } finally {
      setDeleteLoading(false);
      setIsPending(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Notifications */}
      {success && (
        <div className="p-4 bg-brand-mint/10 border border-brand-mint/30 rounded-2xl text-xs font-bold text-brand-mint animate-scale-up">
          🎉 {success}
        </div>
      )}
      {error && (
        <div className="p-4 bg-brand-red/10 border border-brand-red/30 rounded-2xl text-xs font-bold text-brand-red animate-scale-up">
          ⚠️ {error}
        </div>
      )}

      {/* Control Bar: Search, Filter, and Add */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row gap-3 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search products by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-brand-mint/20 rounded-2xl text-sm font-semibold text-brand-navy focus:outline-none focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/15 transition-all placeholder-brand-navy/35"
            />
            <span className="absolute left-4 top-3.5 text-brand-navy/30">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.637 10.637Z" />
              </svg>
            </span>
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-white border border-brand-mint/20 rounded-2xl text-sm font-bold text-brand-navy focus:outline-none focus:border-brand-pink transition-all"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Add Product Button */}
        <Link
          href="/admin/products/new"
          className="flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-pink hover:bg-brand-pink/90 text-white font-black rounded-2xl text-sm transition-all shadow-lg shadow-brand-pink/15 active:scale-[0.98] select-none"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Product
        </Link>
      </div>

      {/* Catalog Table */}
      <div className="bg-white border border-brand-mint/20 rounded-[2.5rem] overflow-hidden shadow-xl shadow-brand-navy/2">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="p-4 bg-brand-yellow/10 text-brand-orange rounded-full mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
            </span>
            <p className="text-sm font-bold text-brand-navy/60">No products found</p>
            <p className="text-xs text-brand-navy/40 mt-1">Try adjusting your filters or add a new product catalog.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-mint/5 border-b border-brand-mint/10 text-[10px] font-black text-brand-navy/50 uppercase tracking-widest">
                  <th className="py-4 px-6">Product Info</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Price</th>
                  <th className="py-4 px-4">Sizing Stocks</th>
                  <th className="py-4 px-4">Featured</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-mint/5">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-brand-mint/2 transition-colors">
                    {/* Info */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-brand-mint/15 bg-brand-mint/5 shrink-0">
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-black text-brand-navy line-clamp-1">{product.name}</p>
                          <div className="flex gap-2 mt-1">
                            {product.gender && (
                              <span className="text-[10px] font-bold text-brand-pink uppercase tracking-wider bg-brand-pink/5 px-2 py-0.5 rounded-md">
                                {product.gender}
                              </span>
                            )}
                            {product.ageRange && (
                              <span className="text-[10px] font-bold text-brand-navy/60 bg-brand-navy/5 px-2 py-0.5 rounded-md">
                                {product.ageRange}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4 text-xs font-black text-brand-navy/70 uppercase tracking-wider">
                      {product.category.name}
                    </td>

                    {/* Price */}
                    <td className="py-4 px-4 text-sm font-black text-brand-navy">
                      ₹{(product.price / 100).toFixed(2)}
                    </td>

                    {/* Inventory */}
                    <td className="py-4 px-4">
                      {product.inventory.length === 0 ? (
                        <span className="text-[10px] font-black text-brand-red bg-brand-red/5 px-2 py-1 rounded-md">
                          Out of Stock
                        </span>
                      ) : (
                        <div className="flex flex-wrap gap-1.5 max-w-[280px]">
                          {product.inventory.map((inv, idx) => {
                            const isLow = inv.stockQuantity <= 3;
                            const isOut = inv.stockQuantity === 0;
                            return (
                              <span
                                key={idx}
                                className={`text-[10px] font-bold px-2 py-1 rounded-md ${
                                  isOut
                                    ? "bg-brand-red/10 text-brand-red line-through"
                                    : isLow
                                    ? "bg-brand-yellow/10 text-brand-orange"
                                    : "bg-brand-mint/10 text-brand-mint"
                                }`}
                              >
                                {inv.size} ({inv.stockQuantity})
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </td>

                    {/* Featured */}
                    <td className="py-4 px-4">
                      <span
                        className={`text-[10px] font-black tracking-widest uppercase px-2.5 py-1.5 rounded-lg ${
                          product.isFeatured
                            ? "bg-brand-yellow/15 text-brand-orange border border-brand-yellow/20"
                            : "bg-brand-navy/5 text-brand-navy/50"
                        }`}
                      >
                        {product.isFeatured ? "★ Featured" : "Standard"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="p-2 bg-brand-mint/5 hover:bg-brand-mint/15 text-brand-navy rounded-xl transition-all border border-brand-mint/15 hover:scale-105"
                          title="Edit Product"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                          </svg>
                        </Link>
                        <button
                          onClick={() => setDeletingId(product.id)}
                          className="p-2 bg-brand-red/5 hover:bg-brand-red/15 text-brand-red rounded-xl transition-all border border-brand-red/15 hover:scale-105"
                          title="Delete Product"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9 9m-4.788-1.042 1.489-.25a1.144 1.144 0 0 0-.137-1.258V6a1.875 1.875 0 0 0-1.875-1.875h-3.75A1.875 1.875 0 0 0 6 6v.152c0 .065-.021.13-.062.18l-1.489-.25ZM9.75 6.75H14.25v-1.5H9.75v1.5Zm0 0v1.5M6 18.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V7.5H6v11.25Z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          <div
            className="absolute inset-0 bg-brand-navy/20 backdrop-blur-xs animate-fade-in"
            onClick={() => {
              if (!deleteLoading) setDeletingId(null);
            }}
          />
          <div className="bg-white border border-brand-mint/20 rounded-[2.5rem] p-8 max-w-md w-full relative z-10 shadow-2xl animate-scale-up">
            <h3 className="text-xl font-black text-brand-navy mb-2 tracking-tight">
              Delete Product?
            </h3>
            <p className="text-sm font-semibold text-brand-navy/60 mb-6 leading-relaxed">
              Are you sure you want to permanently delete this product? Sizing stock values will also be deleted. This operation cannot be undone.
            </p>

            <div className="flex gap-4">
              <button
                disabled={deleteLoading}
                onClick={() => setDeletingId(null)}
                className="flex-1 py-3 px-4 bg-brand-navy/5 hover:bg-brand-navy/10 text-brand-navy font-bold rounded-2xl transition-all border border-brand-navy/10 text-sm active:scale-[0.98]"
              >
                Cancel
              </button>
              <button
                disabled={deleteLoading}
                onClick={() => handleDelete(deletingId)}
                className="flex-1 py-3 px-4 bg-brand-red hover:bg-brand-red/90 text-white font-bold rounded-2xl transition-all text-sm shadow-lg shadow-brand-red/10 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {deleteLoading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
