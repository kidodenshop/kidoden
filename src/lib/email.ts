import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface SendOrderEmailArgs {
  toEmail: string;
  customerName: string;
  orderNumber: string;
  totalAmount: number; // in Rupees
  items: Array<{
    name: string;
    size: string;
    quantity: number;
    price: number; // in Rupees
  }>;
  isCod?: boolean;
  shippingAddress?: string;
}

export async function sendOrderConfirmationEmail({
  toEmail,
  customerName,
  orderNumber,
  totalAmount,
  items,
  isCod = false,
  shippingAddress,
}: SendOrderEmailArgs) {
  if (!resend) {
    console.warn("[EMAIL UTILITY] Resend API key is not configured. Confirmation email skipped.");
    return;
  }

  const itemsHtml = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px 10px; border-bottom: 1px solid #f3f4f6; color: #1f2937; font-size: 14px;">
          <div style="font-weight: 600;">${item.name}</div>
          <div style="font-size: 11px; color: #FF6B8B; font-weight: 700; margin-top: 2px;">Size: ${item.size}</div>
        </td>
        <td style="padding: 12px 10px; text-align: center; border-bottom: 1px solid #f3f4f6; color: #4b5563; font-size: 14px; font-weight: 600;">
          ${item.quantity}
        </td>
        <td style="padding: 12px 10px; text-align: right; border-bottom: 1px solid #f3f4f6; color: #1f2937; font-size: 14px; font-weight: 700;">
          ₹${item.price.toFixed(2)}
        </td>
      </tr>
    `
    )
    .join("");

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kidoden.in";

  try {
    const response = await resend.emails.send({
      from: "Kidoden <orders@mail.kidoden.in>",
      to: toEmail,
      subject: `Order Confirmed! 🎉 Receipt for Order #${orderNumber}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 20px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <!-- Header Logo / Branding -->
          <div style="text-align: center; margin-bottom: 25px;">
            <img src="${siteUrl}/brand_logo-new.png" alt="Kidoden Logo" style="height: 50px; width: auto; display: inline-block; outline: none; border: none; text-decoration: none;" />
          </div>

          <h2 style="color: #1a4263; text-align: center; font-size: 22px; font-weight: 800; margin-top: 0; margin-bottom: 8px;">Order Confirmed!</h2>
          <p style="text-align: center; color: #4b5563; font-size: 14px; line-height: 1.5; margin-bottom: 25px;">
            ${
              isCod
                ? `Hi <strong>${customerName}</strong>, thank you for shopping with us! We have successfully received your order and are packing your items with love. Please keep <strong>₹${totalAmount.toFixed(2)}</strong> ready for payment upon delivery.`
                : `Hi <strong>${customerName}</strong>, thank you for shopping with us! We have successfully received your payment and are packing your items with love.`
            }
          </p>
          
          <!-- Order ID Box -->
          <div style="background-color: #fff8f8; border: 1px dashed #fecaca; border-radius: 12px; padding: 15px; text-align: center; margin-bottom: 25px;">
            <span style="font-size: 11px; text-transform: uppercase; color: #f87171; font-weight: 800; letter-spacing: 1px; display: block; margin-bottom: 4px;">Order Number</span>
            <strong style="font-size: 18px; color: #1a4263; font-weight: 900; letter-spacing: -0.5px;">${orderNumber}</strong>
          </div>
          
          <!-- Delivery Address Box -->
          ${
            shippingAddress
              ? `
          <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 15px; margin-bottom: 25px; font-size: 13px; line-height: 1.5; color: #4b5563; text-align: left;">
            <span style="font-size: 10px; text-transform: uppercase; color: #9ca3af; font-weight: 800; letter-spacing: 1.5px; display: block; margin-bottom: 6px;">Delivering at</span>
            <strong style="color: #1f2937;">${shippingAddress}</strong>
          </div>
          `
              : ""
          }
          
          <!-- Table -->
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
            <thead>
              <tr style="background-color: #f9fafb;">
                <th style="padding: 10px; text-align: left; color: #4b5563; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #e5e7eb;">Item</th>
                <th style="padding: 10px; text-align: center; color: #4b5563; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #e5e7eb;">Qty</th>
                <th style="padding: 10px; text-align: right; color: #4b5563; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #e5e7eb;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          
          <!-- Total -->
          <div style="text-align: right; padding-top: 5px; margin-bottom: 30px;">
            <span style="font-size: 13px; color: #4b5563; font-weight: 600; text-transform: uppercase; margin-right: 10px;">${isCod ? "Total to Pay (COD):" : "Total Paid:"}</span>
            <span style="font-size: 20px; color: #FF6B8B; font-weight: 900; letter-spacing: -0.5px;">₹${totalAmount.toFixed(2)}</span>
          </div>
          
          <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 25px 0;" />
          
          <!-- Contact footer -->
          <p style="font-size: 12px; color: #4b5563; text-align: center; line-height: 1.6; margin-bottom: 8px; font-weight: 600;">
            Questions? Connect with us at <a href="mailto:kidoden.shop@gmail.com" style="color: #FF6B8B; text-decoration: none;">kidoden.shop@gmail.com</a> or call <span style="white-space: nowrap;">+91 9606969128</span>.
          </p>
          <p style="font-size: 10px; color: #9ca3af; text-align: center; line-height: 1.4; margin-bottom: 0;">
            *This is an auto-generated transactional receipt. Please do not reply directly to this email address.
          </p>
        </div>
      `,
    });

    if (response.error) {
      console.error("[EMAIL UTILITY] Failed to send order confirmation email:", response.error);
    } else {
      console.log(`[EMAIL UTILITY] Order confirmation email sent successfully. ID: ${response.data?.id}`);
    }
  } catch (error) {
    console.error("[EMAIL UTILITY] Failed to send order confirmation email:", error);
  }
}
