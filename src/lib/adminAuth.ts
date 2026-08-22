import { cookies } from "next/headers";

const SESSION_SECRET = process.env.SESSION_SECRET || "default_super_secret_session_secret_for_kidoden_2026";
const COOKIE_NAME = "admin_session";
const encoder = new TextEncoder();

// Simple helper to sign a message using Web Crypto API (fully compatible with Edge Runtime)
async function signMessage(message: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(message)
  );
  
  // Convert ArrayBuffer to Hex String
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Simple helper to verify a message using Web Crypto API
async function verifyMessage(message: string, signatureHex: string, secret: string): Promise<boolean> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );

  // Convert Hex String to Uint8Array
  const sigBytes = new Uint8Array(signatureHex.length / 2);
  for (let i = 0; i < sigBytes.length; i++) {
    sigBytes[i] = parseInt(signatureHex.substring(i * 2, i * 2 + 2), 16);
  }

  const dataBytes = encoder.encode(message);
  return await crypto.subtle.verify(
    "HMAC",
    key,
    sigBytes,
    dataBytes
  );
}

export interface SessionPayload {
  username: string;
  expiresAt: number;
}

export async function encrypt(payload: SessionPayload): Promise<string> {
  const dataStr = JSON.stringify(payload);
  
  // Base64 encode safely for unicode
  const base64Data = btoa(unescape(encodeURIComponent(dataStr)));
  const signature = await signMessage(base64Data, SESSION_SECRET);
  return `${base64Data}.${signature}`;
}

export async function decrypt(token: string): Promise<SessionPayload | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;
    const [base64Data, signature] = parts;
    const isValid = await verifyMessage(base64Data, signature, SESSION_SECRET);
    if (!isValid) return null;
    
    // Base64 decode safely
    const dataStr = decodeURIComponent(escape(atob(base64Data)));
    const payload = JSON.parse(dataStr) as SessionPayload;
    
    if (Date.now() > payload.expiresAt) {
      return null; // Expired
    }
    return payload;
  } catch (e) {
    return null;
  }
}

// Get session helper
export async function getSession(cookieStore?: any): Promise<SessionPayload | null> {
  const store = cookieStore || (await cookies());
  const sessionCookie = store.get(COOKIE_NAME);
  if (!sessionCookie || !sessionCookie.value) return null;
  return await decrypt(sessionCookie.value);
}

// Create session cookie
export async function createSession(username: string) {
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
  const payload: SessionPayload = { username, expiresAt };
  const sessionToken = await encrypt(payload);
  
  const store = await cookies();
  store.set(COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(expiresAt),
    path: "/",
  });
}

// Delete session cookie
export async function deleteSession() {
  const store = await cookies();
  store.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
    path: "/",
  });
}
