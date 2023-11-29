/**const express = require('express');

const app = express();
const port = 3000;

// Middleware to enable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allows requests from any origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Explicitly allow methods
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    // Handle preflight requests for CORS
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// JSON parser middleware
app.use(express.json());

// Your existing routes...
app.post('/chat', (req, res) => {
    // Logic for handling chat
    res.json({ response: "Response from ChatGPT" });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});**/


import express from 'express';
import openai from 'openai';
import bodyParser from 'body-parser';
//import awsServerlessExpress from 'aws-serverless-express';


const app = express();



const port = 3000;

// Set the API key directly
const openaiClient = new openai({
    apiKey: process.env.OPENAI_API_KEY,
});

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allows requests from any origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Explicitly allow methods
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    if (req.method === 'OPTIONS') {
        res.sendStatus(204);
    } else {
        next();
    }
});

app.post('/chat', async (req, res) => {
    try {
        const response = await openaiClient.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{role: "system", content: "You are a helpful assistant."}, {role: "user", content: req.body.message}],
        });

        res.json({ response: response.choices[0].message.content.trim() });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error processing your request');
    }
});

/**app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});**/

const server = awsServerlessExpress.createServer(app);

export const handler = (event, context) => {
    awsServerlessExpress.proxy(server, event, context);
};

