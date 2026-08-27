"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAdminLoader } from "@/context/AdminLoaderContext";

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
    price: number;
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

interface OrderDetailClientProps {
  order: any;
}

export default function OrderDetailClient({ order: initialOrder }: OrderDetailClientProps) {
  const router = useRouter();
  const { setIsPending, setPendingMessage } = useAdminLoader();
  
  const [order, setOrder] = useState<Order>(initialOrder as Order);
  
  // Status selectors
  const [status, setStatus] = useState<string>(order.status);
  const [paymentStatus, setPaymentStatus] = useState<string>(order.paymentStatus);
  
  // Shipping details form
  const [courierName, setCourierName] = useState<string>(order.shippingDetails?.courierName || "");
  const [awbNumber, setAwbNumber] = useState<string>(order.shippingDetails?.awbNumber || "");
  const [shiprocketOrderId, setShiprocketOrderId] = useState<string>(order.shippingDetails?.shiprocketOrderId || "");
  const [shipmentStatus, setShipmentStatus] = useState<string>(order.shippingDetails?.status || "");
  
  // Success / Error messages
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Handlers for updates
  const handleUpdateStatus = async (type: "order" | "payment" | "shipping") => {
    setSuccessMsg(null);
    setErrorMsg(null);
    
    let payload: any = {};
    if (type === "order") {
      setPendingMessage("Updating order status...");
      payload = { status };
    } else if (type === "payment") {
      setPendingMessage("Updating payment status...");
      payload = { paymentStatus };
    } else if (type === "shipping") {
      setPendingMessage("Saving shipment details...");
      payload = {
        shippingDetails: {
          courierName: courierName || null,
          awbNumber: awbNumber || null,
          shiprocketOrderId: shiprocketOrderId || null,
          status: shipmentStatus || null,
        }
      };
    }
    
    setIsPending(true);

    try {
      const res = await fetch(`/api/admin/orders/${order.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setSuccessMsg(`Successfully updated ${type} details.`);
        // Reload order state from server response data
        const updatedData = json.data;
        setOrder((prev) => ({
          ...prev,
          status: updatedData.updatedOrder.status,
          paymentStatus: updatedData.updatedOrder.paymentStatus,
          shippingDetails: updatedData.updatedShipping || prev.shippingDetails,
        }));
        router.refresh();
      } else {
        setErrorMsg(json.error || `Failed to update ${type} details.`);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("An unexpected connection error occurred.");
    } finally {
      setIsPending(false);
    }
  };

  // Status badges mapping
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

  // Format date helper
  const formatDate = (dateInput: Date | string) => {
    return new Date(dateInput).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="w-full space-y-8">
      {/* Top Navigation & Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-mint/15 pb-6">
        <div className="space-y-1">
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-2 text-xs font-black text-brand-navy/60 hover:text-brand-navy transition-colors mb-2 group"
          >
            <svg className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to Orders List
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-black text-brand-navy tracking-tight">
              Order {order.orderNumber}
            </h1>
            <span className={`text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-xl ${getOrderStatusStyle(order.status)}`}>
              {order.status}
            </span>
            <span className={`text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-xl ${getPaymentStatusStyle(order.paymentStatus)}`}>
              Payment: {order.paymentStatus}
            </span>
          </div>
          <p className="text-xs font-semibold text-brand-navy/50">
            Placed on {formatDate(order.createdAt)}
          </p>
        </div>

        {/* Action button: Receipt Printable */}
        <button
          onClick={() => window.print()}
          className="self-start sm:self-center flex items-center justify-center gap-2 px-5 py-3.5 bg-brand-navy hover:bg-brand-navy/90 text-white font-black rounded-2xl text-xs transition-all shadow-lg shadow-brand-navy/10 active:scale-[0.98]"
        >
          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0a2.25 2.25 0 0 1-2.25 2.25H8.59A2.25 2.25 0 0 1 6.34 18m11.318-4.171c.642.09 1.285.201 1.921.332 1.115.228 1.94 1.205 1.94 2.344v2.181a2.25 2.25 0 0 1-2.25 2.25h-.375m-14.136-6.776A44.898 44.898 0 0 1 3.5 13.83c-1.115-.228-1.94-1.205-1.94-2.344v-2.181a2.25 2.25 0 0 1 2.25-2.25h1.375m1.318 6.776a18.96 18.96 0 0 0 11.318 0m-11.318 0V9.25A2.25 2.25 0 0 1 8.59 7h6.82A2.25 2.25 0 0 1 17.66 9.25v4.577m-8.328-10.23A3.75 3.75 0 0 1 12 2.25c1.374 0 2.56.741 3.208 1.847" />
          </svg>
          Print Invoice
        </button>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="p-4 bg-brand-mint/10 border border-brand-mint/30 rounded-2xl text-xs font-bold text-brand-mint animate-scale-up">
          🎉 {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="p-4 bg-brand-red/10 border border-brand-red/30 rounded-2xl text-xs font-bold text-brand-red animate-scale-up">
          ⚠️ {errorMsg}
        </div>
      )}

      {/* Main Grid details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Columns - Details (Span 2) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Order Items Box */}
          <div className="bg-white border border-brand-mint/20 rounded-[2.5rem] p-8 shadow-xl shadow-brand-navy/2">
            <h2 className="text-lg font-black text-brand-navy tracking-tight mb-6">
              Items Purchased
            </h2>
            
            <div className="divide-y divide-brand-mint/10">
              {order.items.map((item) => (
                <div key={item.id} className="py-4.5 flex gap-4 first:pt-0 last:pb-0 items-center justify-between">
                  <div className="flex gap-4 items-center">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-brand-mint/15 bg-brand-mint/5 shrink-0">
                      <Image
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-black text-brand-navy leading-snug">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-brand-navy/60 font-bold mt-1">
                        Size: <span className="text-brand-pink">{item.size}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right shrink-0">
                    <p className="text-sm font-black text-brand-navy">
                      ₹{(item.price / 100).toFixed(2)}
                    </p>
                    <p className="text-[11px] text-brand-navy/40 font-semibold mt-0.5">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Calculations Summary */}
            <div className="border-t border-brand-mint/10 mt-6 pt-6 space-y-3">
              <div className="flex justify-between text-xs font-semibold text-brand-navy/60">
                <span>Items Subtotal</span>
                <span>₹{(order.totalAmount / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs font-semibold text-brand-navy/60">
                <span>Shipping Charges</span>
                <span className="text-brand-mint font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-sm font-black text-brand-navy pt-2 border-t border-brand-mint/5">
                <span>Total Amount Due</span>
                <span className="text-lg text-brand-navy">₹{(order.totalAmount / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Customer & Address Details Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Customer Details Box */}
            <div className="bg-white border border-brand-mint/20 rounded-[2.5rem] p-8 shadow-xl shadow-brand-navy/2 space-y-4">
              <h3 className="text-base font-black text-brand-navy tracking-tight border-b border-brand-mint/10 pb-3">
                Customer Information
              </h3>
              
              <div className="space-y-3 text-xs leading-relaxed text-brand-navy/85">
                <div>
                  <p className="font-bold text-brand-navy/55 uppercase tracking-wider text-[9px] mb-0.5">Full Name</p>
                  <p className="font-black text-brand-navy text-sm">{order.customer?.name || "Anonymous Parent"}</p>
                </div>
                <div>
                  <p className="font-bold text-brand-navy/55 uppercase tracking-wider text-[9px] mb-0.5">Email Address</p>
                  <a href={`mailto:${order.customer?.email}`} className="font-bold text-brand-pink hover:underline">
                    {order.customer?.email}
                  </a>
                </div>
                <div>
                  <p className="font-bold text-brand-navy/55 uppercase tracking-wider text-[9px] mb-0.5">Phone Number</p>
                  <p className="font-bold">{order.customer?.phone || "Not provided during checkout"}</p>
                </div>
              </div>
            </div>

            {/* Shipping Address Box */}
            <div className="bg-white border border-brand-mint/20 rounded-[2.5rem] p-8 shadow-xl shadow-brand-navy/2 space-y-4">
              <h3 className="text-base font-black text-brand-navy tracking-tight border-b border-brand-mint/10 pb-3">
                Delivery Address
              </h3>
              
              <div className="space-y-3 text-xs leading-relaxed text-brand-navy/85">
                <div>
                  <p className="font-bold text-brand-navy/55 uppercase tracking-wider text-[9px] mb-0.5">Street Address</p>
                  <p className="font-bold text-brand-navy leading-normal">{order.shippingAddress?.line1}</p>
                  {order.shippingAddress?.line2 && (
                    <p className="font-bold text-brand-navy leading-normal">{order.shippingAddress?.line2}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="font-bold text-brand-navy/55 uppercase tracking-wider text-[9px] mb-0.5">City & State</p>
                    <p className="font-bold">{order.shippingAddress?.city}, {order.shippingAddress?.state}</p>
                  </div>
                  <div>
                    <p className="font-bold text-brand-navy/55 uppercase tracking-wider text-[9px] mb-0.5">Pincode</p>
                    <p className="font-bold">{order.shippingAddress?.postalCode}</p>
                  </div>
                </div>
                <div>
                  <p className="font-bold text-brand-navy/55 uppercase tracking-wider text-[9px] mb-0.5">Recipient Contact</p>
                  <p className="font-bold">📞 {order.shippingAddress?.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment metadata */}
          <div className="bg-white border border-brand-mint/20 rounded-[2.5rem] p-8 shadow-xl shadow-brand-navy/2 space-y-4">
            <h3 className="text-base font-black text-brand-navy tracking-tight border-b border-brand-mint/10 pb-3">
              Payment Gateway Transaction Logs
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-brand-navy/85 leading-relaxed">
              <div>
                <p className="font-bold text-brand-navy/55 uppercase tracking-wider text-[9px] mb-0.5">Payment Method</p>
                <span className={`inline-block text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-lg border mt-1 ${
                  order.paymentMethod === "COD" 
                    ? "bg-amber-50 text-amber-700 border-amber-100" 
                    : "bg-blue-50 text-blue-700 border-blue-100"
                }`}>
                  {order.paymentMethod === "COD" ? "Cash On Delivery (COD)" : "Online Payment (Razorpay)"}
                </span>
              </div>
              
              <div>
                <p className="font-bold text-brand-navy/55 uppercase tracking-wider text-[9px] mb-0.5">Transaction Status</p>
                <span className={`inline-block text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-lg mt-1 ${getPaymentStatusStyle(order.paymentStatus)}`}>
                  {order.paymentStatus}
                </span>
              </div>

              {order.paymentMethod === "RAZORPAY" && order.payment && (
                <>
                  <div className="md:col-span-2 border-t border-brand-mint/5 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-bold text-brand-navy/55 uppercase tracking-wider text-[9px]">Razorpay Order ID</p>
                      <code className="block bg-brand-navy/[0.03] p-2 rounded-xl text-[11px] font-semibold text-brand-navy/85 border border-brand-mint/10 mt-1 select-all">
                        {order.payment.razorpayOrderId || "N/A"}
                      </code>
                    </div>
                    <div>
                      <p className="font-bold text-brand-navy/55 uppercase tracking-wider text-[9px]">Razorpay Payment ID</p>
                      <code className="block bg-brand-navy/[0.03] p-2 rounded-xl text-[11px] font-semibold text-brand-navy/85 border border-brand-mint/10 mt-1 select-all">
                        {order.payment.razorpayPaymentId || "Pending signature verification"}
                      </code>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Actions & Shipping Control */}
        <div className="space-y-8">
          
          {/* Status Manager Controls Box */}
          <div className="bg-white border border-brand-mint/20 rounded-[2.5rem] p-8 shadow-xl shadow-brand-navy/2 space-y-6">
            <h3 className="text-lg font-black text-brand-navy tracking-tight border-b border-brand-mint/10 pb-3">
              Fulfillment Controls
            </h3>
            
            {/* Order status picker */}
            <div className="space-y-2">
              <label className="text-xs font-black text-brand-navy/60 uppercase tracking-widest">
                Order Status
              </label>
              <div className="flex gap-2">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="flex-1 px-4 py-3.5 bg-white border border-brand-mint/20 rounded-2xl text-sm font-bold text-brand-navy focus:outline-none focus:border-brand-pink transition-all"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="CONFIRMED">CONFIRMED</option>
                  <option value="SHIPPED">SHIPPED</option>
                  <option value="DELIVERED">DELIVERED</option>
                  <option value="CANCELLED">CANCELLED</option>
                  <option value="REFUNDED">REFUNDED</option>
                </select>
                
                <button
                  onClick={() => handleUpdateStatus("order")}
                  className="px-4 bg-brand-navy hover:bg-brand-navy/90 text-white font-black text-xs rounded-2xl transition-all shadow-md active:scale-95 shrink-0"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Payment status picker */}
            <div className="space-y-2">
              <label className="text-xs font-black text-brand-navy/60 uppercase tracking-widest">
                Payment Status
              </label>
              <div className="flex gap-2">
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  className="flex-1 px-4 py-3.5 bg-white border border-brand-mint/20 rounded-2xl text-sm font-bold text-brand-navy focus:outline-none focus:border-brand-pink transition-all"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="PAID">PAID</option>
                  <option value="FAILED">FAILED</option>
                  <option value="REFUNDED">REFUNDED</option>
                </select>
                
                <button
                  onClick={() => handleUpdateStatus("payment")}
                  className="px-4 bg-brand-navy hover:bg-brand-navy/90 text-white font-black text-xs rounded-2xl transition-all shadow-md active:scale-95 shrink-0"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* Delivery Tracking (Shiprocket metadata manager) Box */}
          <div className="bg-white border border-brand-mint/20 rounded-[2.5rem] p-8 shadow-xl shadow-brand-navy/2 space-y-6">
            <div className="border-b border-brand-mint/10 pb-3 flex justify-between items-center">
              <h3 className="text-lg font-black text-brand-navy tracking-tight">
                Courier Tracking
              </h3>
              <span className="text-[10px] font-black text-brand-pink bg-brand-pink/5 px-2.5 py-1 rounded-md tracking-wider uppercase">
                Shiprocket
              </span>
            </div>

            <div className="space-y-4">
              {/* Courier Name */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-brand-navy/50 uppercase tracking-widest">
                  Courier Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Delhivery, Blue Dart, Xpressbees"
                  value={courierName}
                  onChange={(e) => setCourierName(e.target.value)}
                  className="w-full px-4 py-3 bg-brand-navy/[0.01] border border-brand-mint/20 rounded-2xl text-xs font-semibold text-brand-navy focus:outline-none focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/15 transition-all placeholder-brand-navy/30"
                />
              </div>

              {/* AWB number */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-brand-navy/50 uppercase tracking-widest">
                  AWB Tracking Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. 123456789012"
                  value={awbNumber}
                  onChange={(e) => setAwbNumber(e.target.value)}
                  className="w-full px-4 py-3 bg-brand-navy/[0.01] border border-brand-mint/20 rounded-2xl text-xs font-semibold text-brand-navy focus:outline-none focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/15 transition-all placeholder-brand-navy/30"
                />
              </div>

              {/* Shiprocket Order ID */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-brand-navy/50 uppercase tracking-widest">
                  Shiprocket Order ID
                </label>
                <input
                  type="text"
                  placeholder="e.g. SR-5890241"
                  value={shiprocketOrderId}
                  onChange={(e) => setShiprocketOrderId(e.target.value)}
                  className="w-full px-4 py-3 bg-brand-navy/[0.01] border border-brand-mint/20 rounded-2xl text-xs font-semibold text-brand-navy focus:outline-none focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/15 transition-all placeholder-brand-navy/30"
                />
              </div>

              {/* Shipment Status */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-brand-navy/50 uppercase tracking-widest">
                  Shipment Status
                </label>
                <input
                  type="text"
                  placeholder="e.g. Picked Up, In Transit, Out for Delivery"
                  value={shipmentStatus}
                  onChange={(e) => setShipmentStatus(e.target.value)}
                  className="w-full px-4 py-3 bg-brand-navy/[0.01] border border-brand-mint/20 rounded-2xl text-xs font-semibold text-brand-navy focus:outline-none focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/15 transition-all placeholder-brand-navy/30"
                />
              </div>

              {/* Save Shipping Details button */}
              <button
                onClick={() => handleUpdateStatus("shipping")}
                className="w-full mt-2 py-3.5 bg-brand-pink hover:bg-brand-pink/90 text-white font-black text-xs rounded-2xl transition-all shadow-lg shadow-brand-pink/15 active:scale-[0.98] select-none"
              >
                Save Tracking Info
              </button>
            </div>

            {order.shippingDetails?.awbNumber && (
              <div className="pt-4 border-t border-brand-mint/10 text-[11px] font-semibold text-brand-navy/60 leading-relaxed bg-brand-navy/[0.01] p-3 rounded-2xl">
                💡 <b>Tracking Status Summary:</b>
                <p className="mt-1">Courier: <span className="font-bold text-brand-navy">{order.shippingDetails.courierName}</span></p>
                <p>AWB Tracking: <span className="font-bold text-brand-navy select-all">{order.shippingDetails.awbNumber}</span></p>
                {order.shippingDetails.status && (
                  <p>Current Status: <span className="font-bold text-brand-mint">{order.shippingDetails.status}</span></p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
