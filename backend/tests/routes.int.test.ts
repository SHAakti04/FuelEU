const request = require("supertest");
const app = require("../src/infrastructure/server/app");

describe("Routes API", () => {
  test("GET /health", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  test("GET /routes", async () => {
    const res = await request(app).get("/routes");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /routes/comparison", async () => {
    const res = await request(app).get("/routes/comparison");
    expect(res.statusCode).toBe(200);
    expect(res.body[0]).toHaveProperty("percentDiff");
  });
});
export {}; 