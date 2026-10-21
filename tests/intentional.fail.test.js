/**
 * tests/intentional.fail.test.js
 *
 * LAB 08 REQUIREMENT — INTENTIONAL FAILING RUN
 * ─────────────────────────────────────────────
 * This file exists solely to produce the one required failing CI run
 * documented in the Lab 08 report.
 *
 * HOW TO USE
 *   Step A (create the failing run):
 *     git add .github/workflows/ci.yml tests/
 *     git commit -m "ci: add workflow + intentional failing test for lab-08"
 *     git push origin feature/deployment-ci
 *     → CI runs → this test fails → GitHub shows ❌ → screenshot for report
 *
 *   Step B (fix and make it pass):
 *     git rm tests/intentional.fail.test.js
 *     git commit -m "fix: remove intentional failing test — CI now passes"
 *     git push origin feature/deployment-ci
 *     → CI runs → all tests pass → GitHub shows ✅ → screenshot for report
 *
 * WHY THIS ASSERTION FAILS
 *   The /health endpoint returns { status: "ok", commit: "local" }.
 *   The assertion below deliberately expects "down" instead of "ok",
 *   so it will always fail and the failure message is self-explanatory
 *   in the CI log.
 */

"use strict";

const request = require("supertest");
const app     = require("../src/server");

// Mock Prisma so the server module loads without a real database
jest.mock("../src/prisma", () => ({
  task: { findMany: jest.fn(), findUnique: jest.fn(),
          create: jest.fn(), update: jest.fn(), delete: jest.fn() },
  user: { findMany: jest.fn(), findUnique: jest.fn() },
}));

describe("INTENTIONAL FAIL (delete this file after the failing run is documented)", () => {
  it("expects status 'down' — this MUST fail to satisfy the lab requirement", async () => {
    const res = await request(app).get("/health");
    // /health returns { status: "ok" } — asserting "down" guarantees failure
    expect(res.body.status).toBe("down"); // ← wrong on purpose
  });
});
