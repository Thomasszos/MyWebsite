const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

const createTables = async () => {
    const client = await pool.connect();
    try {
        await client.query(`CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL);`
            );
        await client.query(`CREATE TABLE messages (
            message_id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(user_id),
            message_text TEXT NOT NULL,
            message_type VARCHAR(50),  // 'user' or 'chatgpt'
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`
            );
        console.log("Tables created successfully");
    } catch (err) {
        console.error("Error creating tables:", err);
    } finally {
        client.release();
    }
};

createTables();
