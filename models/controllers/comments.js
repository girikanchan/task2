/*
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

        const { commentcontent } = req.body;
        const postId = req.params.postId;
        const userId = user.id;
        const insertCommentQuery = 'INSERT INTO `CommentsPost` (`postid`, `userid`,`commentcontent`) VALUES (?, ?, ?)';
        connection.query(insertCommentQuery, [postId, userId, commentcontent], (insertErr, insertResult) => {
            if (insertErr) {
                console.error("Error inserting like:", insertErr);
                return res.status(500).json(insertErr);
            }
            console.log("Comment inserted successfully:", insertResult);
            res.status(200).json({ message: 'Post commented successfully' });
        });
    });
};
*/
const bcrypt = require('bcrypt');
const connection = require('../db');
const jwt = require('jsonwebtoken');
const moment = require('moment');

module.exports = async (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json("Not logged in");
    }

    jwt.verify(token, "secretkey", async function (err, user) {
        if (err) {
            return res.status(300).json("Invalid Token");
        }

        const { postId, commentcontent } = req.body;
        const userid = user.id;
        const commentdate = moment().format("YYYY-MM-DD HH:mm:ss");

        console.log('Received postId:', postId);

        const commentquery = 'INSERT INTO CommentsPost(commentcontent,userid,postid,commentdate) Values(?,?,?,?)';

        /*
        const post = {
            userid: user.id,
            postId : postId,
            commentcontent: req.body.commentcontent,
            commentdate: moment().format("YYYY-MM-DD HH:mm:ss")
        };
        */

        const commentQuery = 'INSERT INTO CommentsPost (commentcontent, userid, postid, commentdate) VALUES (?, ?, ?, ?)';

        connection.query(commentQuery, [commentcontent, userid, postId, commentdate], (err, result) => {
            if (err) {
                console.error("Error inserting comment:", err);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            updateCommentCount(postId, res);
        });
    });
};


function updateCommentCount(postId, res) {
    
    const commentCountQuery = 'SELECT COUNT(*) AS commentCount FROM CommentsPost WHERE postid = ?';

    
    connection.query(commentCountQuery, [postId], (countErr, results) => {
        if (countErr) {
            console.error("Error fetching like count:", countErr);
            return res.status(500).json(countErr);
        }

        
        const commentCount = results[0].commentCount;

        
        const updateCommentQuery = 'UPDATE commentCount SET CommentCount = ? WHERE postid = ?';

        
        connection.query(updateCommentQuery, [commentCount, postId], (updateErr, updateResult) => {
            if (updateErr) {
                console.error("Error updating comments count in comment table:", updateErr);
                return res.status(500).json(updateErr);
            }
            console.log("Comment count updated successfully:", updateResult);
            return res.status(200).json({ message: "count operation performed successfully" });
        });
    });
}
