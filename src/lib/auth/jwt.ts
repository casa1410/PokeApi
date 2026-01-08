import "server-only";

const SECRET = "super-secret-key";

export type TokenPayload = {
  userId: string;
  role: "viewer" | "editor";
};

export function createToken(payload: TokenPayload): string {
  const base64 = Buffer.from(JSON.stringify(payload), "utf8").toString(
    "base64"
  );
  const signature = Buffer.from(base64 + SECRET, "utf8").toString("base64");
  return `${base64}.${signature}`;
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;

    const base64 = parts[0];
    const signature = parts[1];
    if (!base64 || !signature) return null;

    const expectedSig = Buffer.from(base64 + SECRET, "utf8").toString("base64");
    if (signature !== expectedSig) return null;

    const payload = JSON.parse(
      Buffer.from(base64, "base64").toString("utf8")
    ) as TokenPayload;

    if (payload.role !== "viewer" && payload.role !== "editor") return null;
    if (typeof payload.userId !== "string") return null;

    return payload;
  } catch {
    return null;
  }
}
