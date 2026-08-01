import request from "supertest";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Task Management API is running",
  });
});

describe("API Tests", () => {
  test("GET / should return API message", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);

    expect(response.body.message).toBe(
      "Task Management API is running"
    );
  });
});