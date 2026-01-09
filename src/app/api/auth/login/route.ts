import { NextResponse } from "next/server";
import { createToken } from "@/lib/auth/jwt";

const DEMO_EMAIL = "admin@poke.com";
const DEMO_PASSWORD = "123456";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    const token = createToken({ userId: "1", role: "editor" });

    const res = NextResponse.json({ success: true });
    res.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 2,
    });

    return res;
  } catch (error) {
    console.error("Error en login:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
