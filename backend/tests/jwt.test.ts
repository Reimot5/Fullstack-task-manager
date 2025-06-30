import { signAccessToken, verifyAccessToken } from "../src/utils/jwt";

test("signAccessToken and verifyAccessToken work correctly", () => {
  const payload = { id: "user-id-123" };
  const token = signAccessToken(payload);
  const decoded = verifyAccessToken(token);

  if (typeof decoded === "string") {
    throw new Error("Decoded token is a string, expected JwtPayload object");
  }
  expect(decoded.id).toBe(payload.id);
});
test("verifyAccessToken rejects invalid token", () => {
  expect(() => verifyAccessToken("invalid-token")).toThrow();
});
