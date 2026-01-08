export type Role = "viewer" | "editor";
export type Permission = "pokemon:list:view" | "pokemon:detail:view";

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  viewer: ["pokemon:list:view"],
  editor: ["pokemon:list:view", "pokemon:detail:view"]
};