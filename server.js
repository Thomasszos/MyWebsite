import express from 'express';
import openai from 'openai';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Required for Heroku free tier PostgreSQL
    }
});

const app = express();

// Use the CORS middleware
app.use(cors());

app.use(bodyParser.json());

// Endpoint to interact with ChatGPT
app.post('/chat', async (req, res) => {
    try {
        const openaiClient = new openai({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const response = await openaiClient.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: req.body.message }],
        });

        // Save user message and ChatGPT response to the database (if needed)

        res.json({ response: response.choices[0].message.content.trim() });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error processing your request');
    }
});

// Endpoint to save messages
app.post('/messages', async (req, res) => {
    const { userId, messageText, messageType } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO messages (user_id, message_text, message_type) VALUES ($1, $2, $3) RETURNING *',
            [userId, messageText, messageType]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Endpoint to retrieve messages for a user
app.get('/messages/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const result = await pool.query(
            'SELECT * FROM messages WHERE user_id = $1',
            [userId]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Listen on the appropriate port for Heroku
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
