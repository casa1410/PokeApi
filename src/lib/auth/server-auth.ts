import "server-only";
import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

export type User = {
  id: string;
  role: "viewer" | "editor";
};

export async function getUserFromToken(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload) return null;

  return {
    id: payload.userId,
    role: payload.role,
  };
}

export function can(user: User | null, permission: string) {
  if (!user) return false;
  if (permission === "pokemon:detail:view") return user.role === "editor";
  return true;
}
