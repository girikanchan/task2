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
            
            const { postId } = req.body; 

            
            const commentQuery = 'SELECT c.*, u.email as user_id FROM CommentsPost AS c JOIN task2db AS u ON (u.id = c.userid) WHERE c.postid = ? ORDER BY c.commentdate DESC';

            connection.query(commentQuery, [postId], (err, comments) => {
                if (err) {
                    return res.status(500).json(err);
                }
                return res.status(200).json(comments);
            });
        });
    } catch (error) {
        console.error('Error retrieving comments:', error);
        res.status(500).json({ error: 'Error retrieving comments' });
    }
};

