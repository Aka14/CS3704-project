const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());

app.post("/api/gemini", async (req, res) => {
  const prompt = req.body?.prompt;
  try {
    const apiResp = await fetch("https://gemini-api-endpoint.example/v1/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`,
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await apiResp.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "proxy error" });
  }
});

module.exports = app;

if (require.main === module) {
  const port = process.env.PORT || 3001;
  app.listen(port, () => console.log(`Server listening on ${port}`));
}