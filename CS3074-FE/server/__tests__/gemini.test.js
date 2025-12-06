// Ensure the server reads the test key before it's required.
process.env.GEMINI_API_KEY = "test-key";

const request = require("supertest");
const app = require("../index"); // server should export the Express app

describe("POST /api/gemini", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ result: "mocked" }),
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
    delete global.fetch;
  });

  it("forwards Authorization: Bearer <KEY> to the Gemini API", async () => {
    const res = await request(app)
      .post("/api/gemini")
      .send({ prompt: "hello" })
      .expect(200)
      .expect("Content-Type", /json/);

    expect(global.fetch).toHaveBeenCalled();
    const fetchArgs = global.fetch.mock.calls[0];
    const fetchOptions = fetchArgs[1] || {};
    const headers = fetchOptions.headers || {};
    const authHeader = headers.Authorization || headers.authorization;
    expect(authHeader).toBe(`Bearer ${process.env.GEMINI_API_KEY}`);
    expect(res.body).toEqual({ result: "mocked" });
  });
});