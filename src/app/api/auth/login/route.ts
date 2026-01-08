import { NextResponse } from "next/server";
import { createToken } from "@/lib/auth/jwt";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  if (email === "admin@poke.com" && password === "123456") {
    const token = createToken({
      userId: "1",
      role: "editor",
    });

    const res = NextResponse.json({ ok: true });

    res.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
    });

    return res;
  }

  return NextResponse.json(
    { error: "Credenciales inválidas" },
    { status: 401 }
  );
}
