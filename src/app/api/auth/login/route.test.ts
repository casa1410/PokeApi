import { POST } from "./route";
import { NextResponse } from "next/server";

(globalThis as unknown as { Request: typeof Request }).Request = globalThis.Request;

describe("POST /api/auth/login", () => {
  it("should return 401 for invalid credentials", async () => {
    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ email: "bad@user.com", password: "wrong" }),
    });

    const res = (await POST(req)) as NextResponse;
    const body = await res.json();

    expect(res.status).toBe(401);
    expect(body.error).toBe("Credenciales inválidas");
  });

  it("should return success and set cookie for valid credentials", async () => {
    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ email: "admin@poke.com", password: "123456" }),
    });

    const res = (await POST(req)) as NextResponse;
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(res.cookies.get("token")).toBeDefined();
  });
});
