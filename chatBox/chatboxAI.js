const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // You can choose any available port

// Replace 'your-api-key' with your actual OpenAI API key
const configuration = new Configuration({
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);

// Body parser middleware to parse JSON bodies
app.use(bodyParser.json());

// POST endpoint to handle chat requests
app.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;

        const response = await openai.createCompletion({
            model: "text-davinci-003", // or any other model you prefer
            prompt: userMessage,
            max_tokens: 150
        });

        res.json({ response: response.data.choices[0].text.trim() });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while processing your request.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
