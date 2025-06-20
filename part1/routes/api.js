const express = require('express');
const router = express.Router();

module.exports = (db) => {
    router.get('/dogs', async (req, res) => {
        try {
        const [rows] = await db.execute(`
            SELECT d.name AS dog_name, d.size, u.username AS owner_username
            FROM Dogs d
            JOIN Users u ON d.owner_id = u.user_id
        `);
        res.json(rows);
        } catch (err) {
        res.status(500).json({ error: 'Failed to get dogs list' });
        }
    });

  router.get('/walkrequests/open', async (req, res) => {
        try {
        const [rows] = await db.execute(`
            SELECT wr.request_id, d.name AS dog_name, wr.requested_time, wr.duration_minutes, wr.location, u.username AS owner_username
            FROM WalkRequests wr
            JOIN Dogs d ON wr.dog_id = d.dog_id
            JOIN Users u ON d.owner_id = u.user_id
            WHERE wr.status = 'open'
        `);
        res.json(rows);
        } catch (err) {
        res.status(500).json({ error: 'Failed to get open walk requests' });
        }
    });

    router.get('/walkers/summary', async (req, res) => {
        try {
            const [rows] = await db.query(`
                SELECT 
                    u.username AS walker_username,
                    COUNT(wr.rating) AS total_ratings,
                    ROUND(AVG(wr.rating), 1) AS average_rating,
                    SUM(CASE WHEN wr.status = 'completed' THEN 1 ELSE 0 END) AS completed_walks
                FROM Users u
                LEFT JOIN WalkRequests wr ON u.user_id = wr.walker_id
                WHERE u.role = 'walker'
                GROUP BY u.username
            `);
            res.json(rows);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error fetching walker summary');
        }
    });
    
    return router;
};
