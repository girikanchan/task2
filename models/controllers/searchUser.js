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

            const { username } = req.body;

            // Check if email and password are provided
            if (!username) {
                return res.status(400).json({ error: 'User name required to search user name.' });
            }
    
            // Query database to find user by email
            const getUserQuery = 'SELECT * FROM task2db WHERE email = ?';
            connection.query(getUserQuery, [username], async (err, results) => {
                if (err) {
                    console.error('Error retrieving user:', err);
                    return res.status(500).json({ error: 'Error retrieving user' });
                }
    
                if (results.length === 0) {
                    return res.status(404).json({ error: 'User not found' });
                }
                return res.status(200).json("Profile found");
            });
        });
    } catch (error) {
        console.error('Error retrieving posts:', error);
        res.status(500).json({ error: 'Error retrieving posts' });
    }
};
