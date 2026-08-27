"use client";

import { useState } from "react";
import Link from "next/link";

interface Customer {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
}

interface Address {
  id: string;
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

interface Payment {
  id: string;
  razorpayOrderId: string | null;
  razorpayPaymentId: string | null;
  status: string;
  amount: number;
}

interface ShippingDetail {
  id: string;
  shiprocketOrderId: string | null;
  awbNumber: string | null;
  courierName: string | null;
  status: string | null;
}

interface OrderItem {
  id: string;
  productId: string;
  size: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    name: string;
    imageUrl: string;
  };
}

interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  shippingAddressId: string;
  totalAmount: number;
  status: "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED";
  paymentStatus: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  paymentMethod: "COD" | "RAZORPAY";
  createdAt: Date | string;
  updatedAt: Date | string;
  customer: Customer;
  shippingAddress: Address;
  payment: Payment | null;
  shippingDetails: ShippingDetail | null;
  items: OrderItem[];
}

interface OrdersListClientProps {
  initialOrders: any[]; // cast inside component
}

export default function OrdersListClient({ initialOrders }: OrdersListClientProps) {
  const orders = initialOrders as Order[];
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>("all");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date-desc");

  // Filtering logic
  const filteredOrders = orders.filter((order) => {
    const orderNumMatch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const customerNameMatch = order.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
    const customerEmailMatch = order.customer?.email?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
    const searchMatch = orderNumMatch || customerNameMatch || customerEmailMatch;

    const statusMatch = statusFilter === "all" || order.status === statusFilter;
    const paymentStatusMatch = paymentStatusFilter === "all" || order.paymentStatus === paymentStatusFilter;
    const paymentMethodMatch = paymentMethodFilter === "all" || order.paymentMethod === paymentMethodFilter;

    return searchMatch && statusMatch && paymentStatusMatch && paymentMethodMatch;
  });

  // Sorting logic
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === "date-desc") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sortBy === "date-asc") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    if (sortBy === "amount-desc") {
      return b.totalAmount - a.totalAmount;
    }
    if (sortBy === "amount-asc") {
      return a.totalAmount - b.totalAmount;
    }
    return 0;
  });

  // Calculations for summary tiles
  const totalOrdersCount = filteredOrders.length;
  const totalRevenue = filteredOrders
    .filter((o) => o.paymentStatus === "PAID")
    .reduce((sum, o) => sum + o.totalAmount, 0) / 100;
  
  const totalPendingCODAmount = filteredOrders
    .filter((o) => o.paymentMethod === "COD" && o.paymentStatus !== "PAID" && o.status !== "CANCELLED")
    .reduce((sum, o) => sum + o.totalAmount, 0) / 100;

  const averageOrderValue = totalOrdersCount > 0 
    ? (filteredOrders.reduce((sum, o) => sum + o.totalAmount, 0) / totalOrdersCount) / 100
    : 0;

  // Status Color Helpers
  const getOrderStatusStyle = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "bg-brand-mint/10 text-brand-mint border border-brand-mint/15";
      case "SHIPPED":
        return "bg-brand-navy/10 text-brand-navy border border-brand-navy/15";
      case "CONFIRMED":
        return "bg-brand-yellow/10 text-brand-orange border border-brand-yellow/20";
      case "PENDING":
        return "bg-brand-pink/10 text-brand-pink border border-brand-pink/15";
      case "CANCELLED":
        return "bg-brand-red/10 text-brand-red border border-brand-red/15";
      case "REFUNDED":
        return "bg-purple-50 text-purple-600 border border-purple-100";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getPaymentStatusStyle = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-brand-mint/10 text-brand-mint border border-brand-mint/15";
      case "PENDING":
        return "bg-brand-yellow/10 text-brand-orange border border-brand-yellow/20";
      case "FAILED":
        return "bg-brand-red/10 text-brand-red border border-brand-red/15";
      case "REFUNDED":
        return "bg-purple-50 text-purple-600 border border-purple-100";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="space-y-8">
      {/* KPI Stats Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Orders Box */}
        <div className="bg-white border border-brand-mint/20 rounded-[2rem] p-6 shadow-xl shadow-brand-navy/2 flex flex-col justify-between group hover:scale-[1.01] transition-transform duration-300">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-black text-brand-navy/55 uppercase tracking-widest">
                Filtered Orders
              </span>
              <span className="p-2 bg-brand-pink/10 text-brand-pink rounded-xl">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.375m3 2.25H6.75A2.25 2.25 0 0 1 4.5 15V6A2.25 2.25 0 0 1 6.75 3.75h9.75A2.25 2.25 0 0 1 18.75 6v11.25a2.25 2.25 0 0 1-2.25 2.25Z" />
                </svg>
              </span>
            </div>
            <h3 className="text-3xl font-black text-brand-navy tracking-tight">
              {totalOrdersCount}
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-brand-navy/40 mt-4">
            Orders matching current filters
          </span>
        </div>

        {/* Paid Revenue Box */}
        <div className="bg-white border border-brand-mint/20 rounded-[2rem] p-6 shadow-xl shadow-brand-navy/2 flex flex-col justify-between group hover:scale-[1.01] transition-transform duration-300">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-black text-brand-navy/55 uppercase tracking-widest">
                Paid Revenue (Filtered)
              </span>
              <span className="p-2 bg-brand-mint/10 text-brand-mint rounded-xl">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </span>
            </div>
            <h3 className="text-3xl font-black text-brand-navy tracking-tight text-brand-mint">
              ₹{totalRevenue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </h3>
          </div>
          <span className="text-[11px] font-bold text-brand-mint mt-4">
            🟢 Excludes unpaid COD/Razorpay
          </span>
        </div>

        {/* Unpaid COD Box */}
        <div className="bg-white border border-brand-mint/20 rounded-[2rem] p-6 shadow-xl shadow-brand-navy/2 flex flex-col justify-between group hover:scale-[1.01] transition-transform duration-300">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-black text-brand-navy/55 uppercase tracking-widest">
                Pending COD Amount
              </span>
              <span className="p-2 bg-brand-yellow/10 text-brand-orange rounded-xl">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </span>
            </div>
            <h3 className="text-3xl font-black text-brand-navy tracking-tight">
              ₹{totalPendingCODAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-brand-navy/40 mt-4">
            Uncollected Cash-on-Delivery
          </span>
        </div>

        {/* AOV Box */}
        <div className="bg-white border border-brand-mint/20 rounded-[2rem] p-6 shadow-xl shadow-brand-navy/2 flex flex-col justify-between group hover:scale-[1.01] transition-transform duration-300">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-black text-brand-navy/55 uppercase tracking-widest">
                Average Order Value
              </span>
              <span className="p-2 bg-brand-navy/10 text-brand-navy rounded-xl">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                </svg>
              </span>
            </div>
            <h3 className="text-3xl font-black text-brand-navy tracking-tight">
              ₹{averageOrderValue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-brand-navy/40 mt-4">
            Based on filtered subset
          </span>
        </div>
      </div>

      {/* Control Bar: Search & Filters */}
      <div className="bg-white border border-brand-mint/20 rounded-[2rem] p-6 shadow-xl shadow-brand-navy/2 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          
          {/* Search bar */}
          <div className="relative flex-1 max-w-lg">
            <input
              type="text"
              placeholder="Search by order number, customer name, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-brand-navy/[0.02] border border-brand-mint/15 rounded-2xl text-sm font-semibold text-brand-navy focus:outline-none focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/15 transition-all placeholder-brand-navy/35"
            />
            <span className="absolute left-4 top-4 text-brand-navy/30">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.637 10.637Z" />
              </svg>
            </span>
          </div>

          {/* Quick Filters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Order Status filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3.5 py-3 bg-white border border-brand-mint/20 rounded-2xl text-xs font-bold text-brand-navy focus:outline-none focus:border-brand-pink transition-all"
            >
              <option value="all">All Order Statuses</option>
              <option value="PENDING">PENDING</option>
              <option value="CONFIRMED">CONFIRMED</option>
              <option value="SHIPPED">SHIPPED</option>
              <option value="DELIVERED">DELIVERED</option>
              <option value="CANCELLED">CANCELLED</option>
              <option value="REFUNDED">REFUNDED</option>
            </select>

            {/* Payment Status filter */}
            <select
              value={paymentStatusFilter}
              onChange={(e) => setPaymentStatusFilter(e.target.value)}
              className="px-3.5 py-3 bg-white border border-brand-mint/20 rounded-2xl text-xs font-bold text-brand-navy focus:outline-none focus:border-brand-pink transition-all"
            >
              <option value="all">All Payments</option>
              <option value="PENDING">PENDING</option>
              <option value="PAID">PAID</option>
              <option value="FAILED">FAILED</option>
              <option value="REFUNDED">REFUNDED</option>
            </select>

            {/* Payment Method filter */}
            <select
              value={paymentMethodFilter}
              onChange={(e) => setPaymentMethodFilter(e.target.value)}
              className="px-3.5 py-3 bg-white border border-brand-mint/20 rounded-2xl text-xs font-bold text-brand-navy focus:outline-none focus:border-brand-pink transition-all"
            >
              <option value="all">All Methods</option>
              <option value="COD">COD</option>
              <option value="RAZORPAY">Razorpay</option>
            </select>

            {/* Sorting */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3.5 py-3 bg-white border border-brand-mint/20 rounded-2xl text-xs font-bold text-brand-navy focus:outline-none focus:border-brand-pink transition-all"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="amount-desc">Total: High to Low</option>
              <option value="amount-asc">Total: Low to High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table Canvas */}
      <div className="bg-white border border-brand-mint/20 rounded-[2.5rem] overflow-hidden shadow-xl shadow-brand-navy/2">
        {sortedOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="p-4 bg-brand-yellow/10 text-brand-orange rounded-full mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
            </span>
            <p className="text-sm font-bold text-brand-navy/60">No orders found</p>
            <p className="text-xs text-brand-navy/40 mt-1">Try adjusting your filters or search keywords.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-mint/5 border-b border-brand-mint/10 text-[10px] font-black text-brand-navy/55 uppercase tracking-widest">
                  <th className="py-4.5 px-6">Order ID</th>
                  <th className="py-4.5 px-4">Customer Details</th>
                  <th className="py-4.5 px-4">Date & Time</th>
                  <th className="py-4.5 px-4">Payment Method</th>
                  <th className="py-4.5 px-4">Payment Status</th>
                  <th className="py-4.5 px-4">Fulfillment Status</th>
                  <th className="py-4.5 px-4">Total Amount</th>
                  <th className="py-4.5 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-mint/5">
                {sortedOrders.map((order) => {
                  const dateStr = new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  });
                  const timeStr = new Date(order.createdAt).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  });

                  return (
                    <tr key={order.id} className="hover:bg-brand-mint/2 transition-colors">
                      {/* Order Number */}
                      <td className="py-4 px-6">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="text-sm font-black text-brand-navy hover:text-brand-pink transition-colors"
                        >
                          {order.orderNumber}
                        </Link>
                        {order.shippingDetails?.awbNumber && (
                          <div className="text-[10px] text-brand-navy/45 mt-0.5 flex items-center gap-1">
                            🚀 {order.shippingDetails.courierName}: {order.shippingDetails.awbNumber}
                          </div>
                        )}
                      </td>

                      {/* Customer Info */}
                      <td className="py-4 px-4">
                        <p className="text-xs font-black text-brand-navy">
                          {order.customer?.name || "Anonymous Parent"}
                        </p>
                        <p className="text-[10px] text-brand-navy/50 font-semibold mt-0.5">
                          {order.customer?.email}
                        </p>
                      </td>

                      {/* Date & Time */}
                      <td className="py-4 px-4">
                        <p className="text-xs font-bold text-brand-navy">{dateStr}</p>
                        <p className="text-[9px] font-semibold text-brand-navy/45 mt-0.5">{timeStr}</p>
                      </td>

                      {/* Payment Method */}
                      <td className="py-4 px-4">
                        <span className={`text-[10px] font-black tracking-widest uppercase px-2.5 py-1.5 rounded-lg border ${
                          order.paymentMethod === "COD" 
                            ? "bg-amber-50 text-amber-700 border-amber-100" 
                            : "bg-blue-50 text-blue-700 border-blue-100"
                        }`}>
                          {order.paymentMethod}
                        </span>
                      </td>

                      {/* Payment Status */}
                      <td className="py-4 px-4">
                        <span className={`text-[9px] font-black tracking-widest uppercase px-2.5 py-1.5 rounded-lg ${getPaymentStatusStyle(order.paymentStatus)}`}>
                          {order.paymentStatus}
                        </span>
                      </td>

                      {/* Order Status */}
                      <td className="py-4 px-4">
                        <span className={`text-[9px] font-black tracking-widest uppercase px-2.5 py-1.5 rounded-lg ${getOrderStatusStyle(order.status)}`}>
                          {order.status}
                        </span>
                      </td>

                      {/* Total Amount */}
                      <td className="py-4 px-4 text-sm font-black text-brand-navy">
                        ₹{(order.totalAmount / 100).toFixed(2)}
                        <p className="text-[9px] text-brand-navy/40 font-semibold mt-0.5">
                          {order.items.length} {order.items.length === 1 ? "item" : "items"}
                        </p>
                      </td>

                      {/* Action */}
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center">
                          <Link
                            href={`/admin/orders/${order.id}`}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-mint/5 hover:bg-brand-mint/15 text-brand-navy text-xs font-black rounded-xl border border-brand-mint/15 transition-all hover:scale-105 active:scale-95"
                          >
                            <svg className="w-3.5 h-3.5 text-brand-navy/60" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            Manage
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
