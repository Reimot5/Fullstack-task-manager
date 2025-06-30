import { hashPassword, comparePasswords } from "../src/utils/hash";

test("hashPassword and comparePasswords work correctly", async () => {
  const password = "mySecret123!";
  const hash = await hashPassword(password);

  expect(hash).not.toBe(password);
  const match = await comparePasswords(password, hash);
  expect(match).toBe(true);
});
test("comparePasswords returns false for incorrect password", async () => {
  const password = "mySecret123!";
  const hash = await hashPassword(password);
  const match = await comparePasswords("wrongPassword", hash);
  expect(match).toBe(false);
});
test("hashPassword generates different hashes for same password", async () => {
  const password = "mySecret123!";
  const hash1 = await hashPassword(password);
  const hash2 = await hashPassword(password);
  expect(hash1).not.toBe(hash2);
  expect(hash1).toMatch(/^\$2[ayb]\$.{56}$/); // bcrypt hash format
  expect(hash2).toMatch(/^\$2[ayb]\$.{56}$/); // bcrypt hash format
});
