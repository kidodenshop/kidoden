import Link from "next/link";
import prisma from "@/lib/db";

// Ensure this page is not statically cached since it displays dynamic db counts
export const revalidate = 0;

export default async function AdminDashboardPage() {
  // Fetch stats directly from the database
  const totalProducts = await prisma.product.count().catch(() => 0);
  
  const lowStockCount = await prisma.inventory.count({
    where: { stockQuantity: { lte: 3 } }
  }).catch(() => 0);

  const totalOrders = await prisma.order.count().catch(() => 0);
  
  const paidOrders = await prisma.order.findMany({
    where: { paymentStatus: "PAID" },
    select: { totalAmount: true }
  }).catch(() => []);

  const totalRevenue = paidOrders.reduce((sum, order) => sum + order.totalAmount, 0) / 100; // converted from paise to Rs

  // Fetch recent orders
  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      customer: {
        select: { name: true, email: true }
      }
    }
  }).catch(() => []);

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-black text-brand-navy tracking-tight mb-2">
          Dashboard Overview
        </h1>
        <p className="text-sm font-semibold text-brand-navy/60">
          Here is a summary of what's happening at Kidoden today.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Revenue Card */}
        <div className="bg-white border border-brand-mint/20 rounded-[2rem] p-6 shadow-xl shadow-brand-navy/2 flex flex-col justify-between group hover:scale-[1.02] transition-transform duration-300">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-black text-brand-navy/55 uppercase tracking-widest">
                Lifetime Revenue
              </span>
              <span className="p-2 bg-brand-yellow/15 text-brand-orange rounded-xl">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </span>
            </div>
            <h3 className="text-3xl font-black text-brand-navy tracking-tight">
              ₹{totalRevenue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
          </div>
          <span className="text-[11px] font-bold text-brand-mint mt-4 flex items-center gap-1">
            🟢 Paid orders only
          </span>
        </div>

        {/* Total Orders Card */}
        <div className="bg-white border border-brand-mint/20 rounded-[2rem] p-6 shadow-xl shadow-brand-navy/2 flex flex-col justify-between group hover:scale-[1.02] transition-transform duration-300">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-black text-brand-navy/55 uppercase tracking-widest">
                Total Orders
              </span>
              <span className="p-2 bg-brand-pink/15 text-brand-pink rounded-xl">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.375m3 2.25H6.75A2.25 2.25 0 0 1 4.5 15V6A2.25 2.25 0 0 1 6.75 3.75h9.75A2.25 2.25 0 0 1 18.75 6v11.25a2.25 2.25 0 0 1-2.25 2.25Z" />
                </svg>
              </span>
            </div>
            <h3 className="text-3xl font-black text-brand-navy tracking-tight">
              {totalOrders}
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-brand-navy/40 mt-4">
            COD and Online combined
          </span>
        </div>

        {/* Total Products Card */}
        <div className="bg-white border border-brand-mint/20 rounded-[2rem] p-6 shadow-xl shadow-brand-navy/2 flex flex-col justify-between group hover:scale-[1.02] transition-transform duration-300">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-black text-brand-navy/55 uppercase tracking-widest">
                Active Catalog
              </span>
              <span className="p-2 bg-brand-mint/15 text-brand-mint rounded-xl">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </span>
            </div>
            <h3 className="text-3xl font-black text-brand-navy tracking-tight">
              {totalProducts}
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-brand-navy/40 mt-4">
            Items visible to customers
          </span>
        </div>

        {/* Low Stock Card */}
        <div className="bg-white border border-brand-mint/20 rounded-[2rem] p-6 shadow-xl shadow-brand-navy/2 flex flex-col justify-between group hover:scale-[1.02] transition-transform duration-300">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-black text-brand-navy/55 uppercase tracking-widest">
                Stock Alerts
              </span>
              <span className="p-2 bg-brand-red/15 text-brand-red rounded-xl">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
              </span>
            </div>
            <h3 className="text-3xl font-black text-brand-navy tracking-tight">
              {lowStockCount}
            </h3>
          </div>
          <span className={`text-[11px] font-bold mt-4 ${lowStockCount > 0 ? "text-brand-red" : "text-brand-mint"}`}>
            {lowStockCount > 0 ? "⚠️ Sizes with stock ≤ 3" : "🎉 All stock levels healthy"}
          </span>
        </div>
      </div>

      {/* Main Grid: Recent Orders & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders List */}
        <div className="lg:col-span-2 bg-white border border-brand-mint/20 rounded-[2.5rem] p-8 shadow-xl shadow-brand-navy/2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black text-brand-navy tracking-tight">
              Recent Orders
            </h2>
            <span className="text-xs font-black text-brand-pink bg-brand-pink/10 px-3.5 py-1.5 rounded-full select-none">
              Live Feed
            </span>
          </div>

          {recentOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <span className="p-4 bg-brand-mint/10 text-brand-mint rounded-full mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.008 1.24l.885 1.77a2.25 2.25 0 0 0 2.007 1.24h1.98a2.25 2.25 0 0 0 2.007-1.24l.885-1.77a2.25 2.25 0 0 1 2.007-1.24h3.86m-18 0h18M2.25 13.5l1.98-7.93A2.25 2.25 0 0 1 6.44 3.75h11.12a2.25 2.25 0 0 1 2.21 1.82l1.98 7.93m-18 0v5.625C2.25 20.375 3.875 22 5.875 22h12.25c2 0 3.625-1.625 3.625-3.625V13.5" />
                </svg>
              </span>
              <p className="text-sm font-bold text-brand-navy/60">No orders received yet.</p>
              <p className="text-xs text-brand-navy/40 mt-1">Orders will appear here once customers start checking out.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-brand-mint/10">
                    <th className="pb-3 text-xs font-black text-brand-navy/50 uppercase tracking-widest">Order</th>
                    <th className="pb-3 text-xs font-black text-brand-navy/50 uppercase tracking-widest">Customer</th>
                    <th className="pb-3 text-xs font-black text-brand-navy/50 uppercase tracking-widest">Date</th>
                    <th className="pb-3 text-xs font-black text-brand-navy/50 uppercase tracking-widest">Total</th>
                    <th className="pb-3 text-xs font-black text-brand-navy/50 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order: any) => (
                    <tr key={order.id} className="border-b border-brand-mint/5 last:border-b-0 hover:bg-brand-mint/5 transition-colors">
                      <td className="py-4 text-sm font-black text-brand-navy">{order.orderNumber}</td>
                      <td className="py-4 text-sm text-brand-navy/80 font-bold">{order.customer.name || order.customer.email}</td>
                      <td className="py-4 text-xs font-semibold text-brand-navy/55">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                      </td>
                      <td className="py-4 text-sm font-black text-brand-navy">₹{(order.totalAmount / 100).toFixed(2)}</td>
                      <td className="py-4">
                        <span className={`text-[10px] font-black tracking-widest uppercase px-2.5 py-1.5 rounded-lg ${
                          order.status === "DELIVERED"
                            ? "bg-brand-mint/10 text-brand-mint"
                            : order.status === "PENDING"
                            ? "bg-brand-yellow/10 text-brand-orange"
                            : "bg-brand-navy/10 text-brand-navy"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Operations Panel */}
        <div className="bg-white border border-brand-mint/20 rounded-[2.5rem] p-8 shadow-xl shadow-brand-navy/2 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-black text-brand-navy tracking-tight mb-6">
              Quick Operations
            </h2>
            
            <div className="space-y-4">
              <Link
                href="/admin/products/new"
                className="flex items-center justify-between p-4 bg-brand-pink/5 hover:bg-brand-pink/10 border border-brand-pink/15 rounded-2xl transition-all group scale-100 hover:scale-[1.01]"
              >
                <div className="flex items-center gap-3.5">
                  <span className="p-2.5 bg-brand-pink/10 text-brand-pink rounded-xl">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </span>
                  <div className="text-left">
                    <p className="text-sm font-black text-brand-navy">Add Product</p>
                    <p className="text-[11px] font-bold text-brand-navy/50 mt-0.5">Upload new clothing & sizing</p>
                  </div>
                </div>
                <svg className="w-4 h-4 text-brand-navy/40 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </Link>

              <Link
                href="/admin/products"
                className="flex items-center justify-between p-4 bg-brand-mint/5 hover:bg-brand-mint/10 border border-brand-mint/15 rounded-2xl transition-all group scale-100 hover:scale-[1.01]"
              >
                <div className="flex items-center gap-3.5">
                  <span className="p-2.5 bg-brand-mint/10 text-brand-mint rounded-xl">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-3.75 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                  </span>
                  <div className="text-left">
                    <p className="text-sm font-black text-brand-navy">Manage Products</p>
                    <p className="text-[11px] font-bold text-brand-navy/50 mt-0.5">Edit price, stock & details</p>
                  </div>
                </div>
                <svg className="w-4 h-4 text-brand-navy/40 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-brand-mint/15">
            <div className="p-4 bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl text-xs font-bold text-brand-navy/70 leading-relaxed">
              💡 <b>Tip:</b> Make sure to manually verify shipping track codes in your Shiprocket panel before transitioning orders to <b>SHIPPED</b>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
