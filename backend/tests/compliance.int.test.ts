import request from "supertest";
import app from "../src/infrastructure/server/app";

describe("Compliance API", () => {
  it("GET /compliance/cb returns CB", async () => {
    const res = await request(app)
      .get("/compliance/cb")
      .query({
        shipId: "SHIP-001",
        year: 2025
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("cbGco2eq");
    expect(typeof res.body.cbGco2eq).toBe("number");
  });

  it("returns 400 if shipId missing", async () => {
    const res = await request(app)
      .get("/compliance/cb")
      .query({ year: 2025 });

    expect(res.status).toBe(400);
  });
});
