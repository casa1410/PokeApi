import { getUserFromToken } from "@/lib/auth/server-auth";
import { redirect } from "next/navigation";
import LoginClientPage from "./login-client";

export default async function LoginPage() {
  const user = await getUserFromToken();

  if (user) {
    redirect("/pokemon");
  }

  return <LoginClientPage />;
}
