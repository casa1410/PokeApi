import { loginUser, logoutUser } from "../service";

global.fetch = jest.fn();

describe("Auth service", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockReset();
  });

  it("should call login endpoint correctly", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });

    const res = await loginUser("admin@poke.com", "123456");
    expect(res.success).toBe(true);
    expect(fetch).toHaveBeenCalledWith(
      "/api/auth/login",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ email: "admin@poke.com", password: "123456" }),
      })
    );
  });

  it("should call logout endpoint correctly", async () => {
    (fetch as jest.Mock).mockResolvedValue({ ok: true });
    await logoutUser();
    expect(fetch).toHaveBeenCalledWith("/api/auth/logout", { method: "POST" });
  });
});
