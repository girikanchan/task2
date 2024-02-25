/*

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
        
        const commentcontent = req.body;
        const postId = req.params.postId;
        const userId = user.id;
        const commentDate = moment().format("YYYY-MM-DD HH:mm:ss");

        console.log('Received postId:', postId);
        
        console.log('Received commentContent:', commentcontent);
        const commentQuery = 'INSERT INTO CommentsPost (commentcontent, userid, postid, commentdate) VALUES (?, ?, ?, ?)';
        
        connection.query(commentQuery, [commentcontent.commentcontent, userId, postId, commentDate ], (err, result) => {
            if (err) {
                console.error("Error inserting comment:", err);
                return res.status(500).json({ error: "Internal Server Error" });
            }

            // Check if postId exists in commentCount table
            const checkCommentCountEntry = 'SELECT * FROM commentCount WHERE postid = ?';

            connection.query(checkCommentCountEntry, [postId], (checkErr, checkResult) => {
                if (checkErr) {
                    console.error("Error checking comment count entry:", checkErr);
                    return res.status(500).json(checkErr);
                }

                if (checkResult.length === 0) {
                    // If postId doesn't exist, insert a new record
                    insertCommentCount(postId, res);
                } else {
                    // If postId exists, update the comment count
                    updateCommentCount(postId, res);
                }
            });
        });
    });
};

function updateCommentCount(postId, res) {
    const commentCountQuery = 'SELECT COUNT(*) AS commentCount FROM CommentsPost WHERE postid = ?';
    
    connection.query(commentCountQuery, [postId], (countErr, results) => {
        if (countErr) {
            console.error("Error fetching comment count:", countErr);
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
            return res.status(200).json({ message: "Count operation performed successfully" });
        });
    });
}

function insertCommentCount(postId, res) {
    const commentCountQuery = 'SELECT COUNT(*) AS commentCount FROM CommentsPost WHERE postid = ?';

    connection.query(commentCountQuery, [postId], (countErr, results) => {
        if (countErr) {
            console.error("Error fetching comment count:", countErr);
            return res.status(500).json(countErr);
        }

        const commentCount = results[0].commentCount || 0;

        const insertCommentCountQuery = 'INSERT INTO commentCount (postid, commentCount) VALUES (?, ?)';
        
        connection.query(insertCommentCountQuery, [postId, commentCount + 1], (insertErr, insertResult) => {
            if (insertErr) {
                console.error("Error inserting comment count:", insertErr);
                return res.status(500).json(insertErr);
            }
            console.log("Comment count inserted successfully:", insertResult);
            return res.status(200).json({ message: "Count insertion operation performed successfully" });
        });
    });
}

*/

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
        
        const commentcontent = req.body;
        const postId = req.params.postId;
        const userId = user.id;
        const commentDate = moment().format("YYYY-MM-DD HH:mm:ss");

        console.log('Received postId:', postId);
        
        console.log('Received commentContent:', commentcontent);
        const commentQuery = 'INSERT INTO CommentsPost (commentcontent, userid, postid, commentdate) VALUES (?, ?, ?, ?)';
        
        connection.query(commentQuery, [commentcontent.commentcontent, userId, postId, commentDate ], (err, result) => {
            if (err) {
                console.error("Error inserting comment:", err);
                return res.status(500).json({ error: "Internal Server Error" });
            }

            // Check if postId exists in commentCount table
            const checkCommentCountEntry = 'SELECT commentCount FROM post WHERE postid = ?';

            connection.query(checkCommentCountEntry, [postId], (checkErr, checkResult) => {
                if (checkErr) {
                    console.error("Error checking comment count entry:", checkErr);
                    return res.status(500).json(checkErr);
                }

                if (checkResult.length === 0) {
                    // If postId doesn't exist, insert a new record
                    insertCommentCount(postId, res);
                } else {
                    // If postId exists, update the comment count
                    updateCommentCount(postId, res);
                }
            });
        });
    });
};

function updateCommentCount(postId, res) {
    const commentCountQuery = 'SELECT COUNT(*) AS commentCount FROM CommentsPost WHERE postid = ?';
    
    connection.query(commentCountQuery, [postId], (countErr, results) => {
        if (countErr) {
            console.error("Error fetching comment count:", countErr);
            return res.status(500).json(countErr);
        }

        const commentCount = results[0].commentCount;

        const updateCommentQuery = 'UPDATE post SET CommentCount = ? WHERE postid = ?';

        connection.query(updateCommentQuery, [commentCount, postId], (updateErr, updateResult) => {
            if (updateErr) {
                console.error("Error updating comments count in comment table:", updateErr);
                return res.status(500).json(updateErr);
            }
            console.log("Comment count updated successfully:", updateResult);
            return res.status(200).json({ message: "Count operation performed successfully" });
        });
    });
}

function insertCommentCount(postId, res) {
    const commentCountQuery = 'SELECT COUNT(*) AS commentCount FROM CommentsPost WHERE postid = ?';

    connection.query(commentCountQuery, [postId], (countErr, results) => {
        if (countErr) {
            console.error("Error fetching comment count:", countErr);
            return res.status(500).json(countErr);
        }

        const commentCount = results[0].commentCount || 0;

        const insertCommentCountQuery = 'INSERT INTO post (commentCount) VALUES (?) where postid = ?';
        
        connection.query(insertCommentCountQuery, [commentCount + 1, postId], (insertErr, insertResult) => {
            if (insertErr) {
                console.error("Error inserting comment count:", insertErr);
                return res.status(500).json(insertErr);
            }
            console.log("Comment count inserted successfully:", insertResult);
            return res.status(200).json({ message: "Count insertion operation performed successfully" });
        });
    });
}
