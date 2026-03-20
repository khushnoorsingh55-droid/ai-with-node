const express = require('express');

const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({debug : true});

const Gen_Ai = new GoogleGenerativeAI( process.env.GEMINI_API_KEY);



const app = express();
const port = 3000
app.use(express.json());

app.post("/gemini", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const model = Gen_Ai.getGenerativeModel({
   model: "gemini-3.1-flash-lite-preview"
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;

    res.json({
      reply: response.text()
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating response");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log("KEY:", process.env.GEMINI_API_KEY);
})


