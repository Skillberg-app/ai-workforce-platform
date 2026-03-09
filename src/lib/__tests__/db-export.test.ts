/**
 * @jest-environment node
 */

describe("@/lib/db exports", () => {
  it("re-exports prisma from the db module", async () => {
    // Verify the db module re-exports prisma
    const db = await import("@/lib/db");
    expect(db.prisma).toBeDefined();
  });
});
