import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

console.log(
  "Gemini API key loaded:",
  Boolean(process.env.GEMINI_API_KEY)
);

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/generate-plan", async (req, res) => {
  try {
    const {
      subjects,
      hours,
      examDate,
      weakSubject,
      level,
    } = req.body;

    console.log("Received study plan request");

    const prompt = `
You are an AI study planner.

Create a personalized daily study plan.

Student information:
Subjects: ${subjects}
Daily study hours: ${hours}
Exam date: ${examDate}
Weakest subject: ${weakSubject}
Current level: ${level}

Create 4 to 6 practical study sessions.
Give extra priority to the weakest subject.

Return ONLY valid JSON in this exact format:

[
  {
    "time": "09:00 AM",
    "subject": "DBMS",
    "topic": "Normalization",
    "duration": "60 min"
  }
]
`;

    const geminiResponse = await fetch(
           "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
          },
        }),
      }
    );

    const result = await geminiResponse.json();

    if (!geminiResponse.ok) {
      console.error("GEMINI API ERROR:", result);

      return res.status(500).json({
        error:
          result?.error?.message ||
          "Gemini API request failed",
      });
    }

    const generatedText =
      result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error("Gemini returned empty response");
    }

    console.log("Gemini response received");

    const plan = JSON.parse(generatedText);

    res.json({ plan });
  } catch (error) {
    console.error("SERVER ERROR:", error);

    res.status(500).json({
      error: error.message || "Failed to generate study plan",
    });
  }
});

app.listen(5000, () => {
  console.log("AI server running on http://localhost:5000");
});