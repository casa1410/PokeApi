import { fetcher } from "@/utils/fetcher";

export async function loginUser(email: string, password: string) {
  const res = await fetcher<{ success: boolean }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  return res;
}

export async function logoutUser() {
  const res = await fetch("/api/auth/logout", { method: "POST" });
  if (!res.ok) throw new Error("Error al cerrar sesión");
}
