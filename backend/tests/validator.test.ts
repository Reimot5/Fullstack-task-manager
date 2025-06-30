import { registerSchema } from "../src/validators/auth.validator";

test("registerSchema validates valid data", () => {
  expect(() =>
    registerSchema.parse({ email: "test@example.com", password: "password123" })
  ).not.toThrow();
});

test("registerSchema rejects invalid email", () => {
  expect(() =>
    registerSchema.parse({ email: "not-an-email", password: "password123" })
  ).toThrow();
});
test("registerSchema rejects short password", () => {
  expect(() =>
    registerSchema.parse({ email: "test@example.com", password: "short" })
  ).toThrow();
});
test("registerSchema rejects missing email", () => {
  expect(() => registerSchema.parse({ password: "password123" })).toThrow();
});
test("registerSchema rejects missing password", () => {
  expect(() => registerSchema.parse({ email: "" })).toThrow();
});
test("registerSchema rejects empty data", () => {
  expect(() => registerSchema.parse({})).toThrow();
});
test("registerSchema rejects non-string email", () => {
  expect(() =>
    registerSchema.parse({ email: 123, password: "password123" })
  ).toThrow();
});
