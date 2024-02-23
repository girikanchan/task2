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

        const { postId } = req.body;

        console.log('Received postId:', postId);

        const commentquery = 'INSERT INTO CommentsPost SET ?';

        const post = {
            userid: user.id,
            postId : postId,
            commentcontent: req.body.commentcontent,
            commentdate: moment().format("YYYY-MM-DD HH:mm:ss")
        };

        connection.query(commentquery, post, (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json("Post has been created");
        });
    });
};
