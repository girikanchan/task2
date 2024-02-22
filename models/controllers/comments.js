const connection = require('../db');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json("Not logged in");
    }

    jwt.verify(token, "secretkey", async function (err, user) {
        if (err) {
            return res.status(300).json("Invalid Token");
        }

        const { postId,commentcontent} = req.body;
        const userId = user.id;
        const insertCommentQuery = 'INSERT INTO `CommentsPost` (`postid`, `userid`,`commentcontent`) VALUES (?, ?, ?)';
        connection.query(insertCommentQuery, [postId, userId,commentcontent], (insertErr, insertResult) => {
            if (insertErr) {
                console.error("Error inserting like:", insertErr);
                return res.status(500).json(insertErr);
            }
            console.log("Comment inserted successfully:", insertResult);
            res.status(200).json({ message: 'Post commented successfully' });
    })
})
};
