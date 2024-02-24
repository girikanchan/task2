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

/*
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

        //const commentquery = 'INSERT INTO CommentsPost(commentcontent,userid,postid,commentdate) Values(?,?,?,?)';

        /*
        const post = {
            userid: user.id,
            postId : postId,
            commentcontent: req.body.commentcontent,
            commentdate: moment().format("YYYY-MM-DD HH:mm:ss")
        };
        */
/*
        const commentQuery = 'INSERT INTO CommentsPost (commentcontent, userid, postid, commentdate) VALUES (?, ?, ?, ?)';

        const checkCommentCountEntry = 'Select * from commentCount where postid = ?';

        connection.query(checkCommentCountEntry, [postId], (checkErr, checkResult) => {
            if (checkErr) {
                console.error("Error checking PostId:", checkErr);
                return res.status(500).json(checkErr);
            }

            if (checkResult.length <= 0) {
                insertCommentCount(postId, res);
            }
        });
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

//this function will work when postid is not their in commentCount table
function insertCommentCount(postId, res) {
    
    const commentCountQuery = 'SELECT COUNT(*) AS commentCount FROM CommentsPost WHERE postid = ?';

    
    connection.query(commentCountQuery, [postId], (countErr, results) => {
        if (countErr) {
            console.error("Error fetching like count:", countErr);
            return res.status(500).json(countErr);
        }

        
        const commentCount = results[0].commentCount;

        
        const updateCommentQuery = 'INSERT into commentCount(postid,commentCount) VALUES(?,?) WHERE postid = ?';

        connection.query(updateCommentQuery, [commentCount, postId, postId], (updateErr, updateResult) => {
            if (updateErr) {
                console.error("Error updating comments count in comment table:", updateErr);
                return res.status(500).json(updateErr);
            }
            console.log("Comment count inserted successfully:", updateResult);
            return res.status(200).json({ message: "count insertion operation performed successfully" });
        });
    });
}

*/

/*
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

        const { postId, commentContent } = req.body;
        const userId = user.id;
        const commentDate = moment().format("YYYY-MM-DD HH:mm:ss");

        const commentQuery = 'INSERT INTO CommentsPost (commentcontent, userid, postid, commentdate) VALUES (?, ?, ?, ?)';
        
        connection.query(commentQuery, [commentContent, userId, postId, commentDate], (err, result) => {
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
    const checkPostIdQuery = 'SELECT * FROM commentCount WHERE postid = ?';

    connection.query(checkPostIdQuery, [postId], (checkErr, checkResult) => {
        if (checkErr) {
            console.error("Error checking if postid exists:", checkErr);
            return res.status(500).json(checkErr);
        }

        if (checkResult.length === 0) {
            const insertCommentCountQuery = 'INSERT INTO commentCount (postid, commentCount) VALUES (?, 1)';
            connection.query(insertCommentCountQuery, [postId], (insertErr, insertResult) => {
                if (insertErr) {
                    console.error("Error inserting comment count:", insertErr);
                    return res.status(500).json(insertErr);
                }
                console.log("Comment count inserted successfully:", insertResult);
                return res.status(200).json({ message: "Count insertion operation performed successfully" });
            });
        } else {
            const incrementCommentCountQuery = 'UPDATE commentCount SET commentCount = commentCount + 1 WHERE postid = ?';
            connection.query(incrementCommentCountQuery, [postId], (incrementErr, incrementResult) => {
                if (incrementErr) {
                    console.error("Error incrementing comment count:", incrementErr);
                    return res.status(500).json(incrementErr);
                }
                console.log("Comment count updated successfully:", incrementResult);
                return res.status(200).json({ message: "Count increment operation performed successfully" });
            });
        }
    });
}
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

        const { postId, commentContent } = req.body;
        const userId = user.id;
        const commentDate = moment().format("YYYY-MM-DD HH:mm:ss");

        console.log('Received postId:', postId);
        
        const commentQuery = 'INSERT INTO CommentsPost (commentcontent, userid, postid, commentdate) VALUES (?, ?, ?, ?)';
        
        connection.query(commentQuery, [commentContent, userId, postId, commentDate], (err, result) => {
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
