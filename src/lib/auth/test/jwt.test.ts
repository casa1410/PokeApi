import { createToken, verifyToken } from "../jwt";

describe("JWT utilities", () => {
  it("should create and verify a valid token", () => {
    const payload: { userId: string; role: "editor" | "viewer" } = {
      userId: "123",
      role: "editor",
    };

    const token = createToken(payload);
    const verified = verifyToken(token);

    expect(verified).not.toBeNull();
    expect(verified?.userId).toBe("123");
    expect(verified?.role).toBe("editor");
  });

  it("should return null for tampered tokens", () => {
    const payload: { userId: string; role: "editor" | "viewer" } = {
      userId: "999",
      role: "viewer",
    };

    const token = createToken(payload);
    const fakeToken = token.replace(/\.[^.]*$/, ".xyz");

    expect(verifyToken(fakeToken)).toBeNull();
  });
});
