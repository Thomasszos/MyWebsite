const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const configuration = new Configuration({
    apiKey: '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',  // Replace with your actual OpenAI API key
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Handle CORS
    next();
});

app.post('/chat', async (req, res) => {
    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "system", content: "You are a helpful assistant."}, {role: "user", content: req.body.message}],
        });

        res.json({ response: response.data.choices[0].message.content.trim() });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error processing your request');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
