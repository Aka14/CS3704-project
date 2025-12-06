const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const multer = require("multer");
const pdfParse = require("pdf-parse");

const upload = multer({ storage: multer.memoryStorage() });

dotenv.config({ path: path.resolve(__dirname, ".env") });
dotenv.config({ path: path.resolve(__dirname, "..", ".env.local") });

if (!process.env.GEMINI_API_KEY && process.env.REACT_APP_GEMINI_API_KEY) {
  process.env.GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY.replace(/^"(.*)"$/, "$1");
}

const app = express();
app.use(express.json());

// Simple text prompt endpoint (for .txt files read on the client)
app.post("/api/gemini", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "No prompt provided" });

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    return res.json({ text });
  } catch (err) {
    console.error("gemini error:", err);
    return res.status(500).json({ error: err?.message ?? String(err) });
  }
});

// File upload endpoint (for PDFs that need server-side parsing)
app.post("/api/gemini-file", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    let extractedText = "";

    const isPdf = file.mimetype === "application/pdf" ||
                  file.originalname.toLowerCase().endsWith(".pdf");
    const isTxt = file.mimetype === "text/plain" ||
                  file.originalname.toLowerCase().endsWith(".txt");

    if (isPdf) {
      const data = await pdfParse(file.buffer);
      extractedText = data?.text || "";
    } else if (isTxt) {
      extractedText = file.buffer.toString("utf8");
    } else {
      return res.status(400).json({ error: "Only PDF and TXT files allowed." });
    }

    const prompt = `Summarize these notes:\n\n${extractedText}`;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const summary = await result.response.text();

    return res.json({ text: summary });

  } catch (err) {
    console.error("gemini-file error:", err);
    return res.status(500).json({ error: err?.message ?? String(err) });
  }
});

module.exports = app;

if (require.main === module) {
  const port = process.env.PORT || 3001;
  app.listen(port, () => console.log(`Server listening on ${port}`));
}
