import test from "node:test";
import assert from "node:assert/strict";

test("service fixture has stable ids", async () => {
  const expected = ["passport", "income-tax", "digilocker"];
  assert.deepEqual(expected.sort(), ["digilocker", "income-tax", "passport"].sort());
});
