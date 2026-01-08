import { cookies } from "next/headers";
import { ROLE_PERMISSIONS, type Permission, type Role } from "./roles";

export type User = { id: string; name: string; roles: Role[] };

export function getUserFromCookies(): User | null {
  const role = cookies().get("role")?.value as Role | undefined;
  if (!role) return null;
  return { id: "u1", name: "Ash", roles: [role] };
}

export function can(user: User | null, permission: Permission): boolean {
  if (!user) return false;
  return user.roles.some((r) => ROLE_PERMISSIONS[r]?.includes(permission));
}