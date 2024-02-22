const connection = require('../db');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    try {
        // Retrieve token from cookies
        const token = req.cookies.accessToken;

        if (!token) {
            return res.status(401).json("Not logged in");
        }

        // Verify the JWT token
        jwt.verify(token, "secretkey", async function (err, user) {
            if (err) {
                return res.status(300).json("Invalid Token");
            }

            // Query posts from database for the authenticated user
            const postquery = 'SELECT p.*, u.email as user_id  FROM post AS p  JOIN task2db AS u ON (u.id = p.id)  WHERE u.id = ? ORDER BY p.updated_time DESC';

            connection.query(postquery, [user.id], (err, posts) => {
                if (err) {
                    return res.status(500).json(err);
                }
                return res.status(200).json(posts);
            });
        });
    } catch (error) {
        console.error('Error retrieving posts:', error);
        res.status(500).json({ error: 'Error retrieving posts' });
    }
};