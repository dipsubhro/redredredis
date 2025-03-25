import express from "express";
import { createClient } from "redis";

const client = createClient();
const app = express();
app.use(express.json());
client.connect();

app.post("/submit", async (req, res) => {
  const { problemId, userId, code, language } = req.body;
  try {
    await client.lPush(
      "submissions",
      JSON.stringify({ problemId, userId, code, language })
    );
    res.json({
      message: "Submission received",
    });
  } catch (error) {
    res.json({
      message: "submission failed",
    });
  }
});

app.listen(3000);
