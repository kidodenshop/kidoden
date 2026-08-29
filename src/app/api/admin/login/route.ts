import { NextResponse } from "next/server";
import { createSession } from "@/lib/adminAuth";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "password";
const ADMIN_USERS_RAW = process.env.ADMIN_USERS;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    let isValid = false;

    // Check multi-user configurations first
    if (ADMIN_USERS_RAW) {
      try {
        const users = JSON.parse(ADMIN_USERS_RAW);
        if (Array.isArray(users)) {
          isValid = users.some(
            (user: any) => user && user.username === username && user.password === password
          );
        }
      } catch (error) {
        console.error("Failed to parse ADMIN_USERS env variable:", error);
      }
    }

    // Fallback to default single-user credentials
    if (!isValid) {
      isValid = username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
    }

    if (isValid) {
      await createSession(username);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
