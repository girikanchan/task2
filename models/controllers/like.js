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

        const { postId } = req.body;
        const userId = user.id;

        const likeQuery = 'INSERT INTO likes (post_id, user_id) VALUES (?, ?)';
        const values = [postId, userId];

        connection.query(likeQuery, values, (err, result) => {
            if (err) {
                console.error("Error inserting like:", err);
                return res.status(500).json(err);
            }
            console.log("Like inserted successfully:", result);
            return res.status(200).json("Post has been liked");
        });
    });
};
*/
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

        const { postId } = req.body;
        const userId = user.id;

        // Insert a new like into the likes table
        const likeQuery = 'INSERT INTO likes (post_id, user_id) VALUES (?, ?)';
        const likeValues = [postId, userId];

        connection.query(likeQuery, likeValues, (likeErr, likeResult) => {
            if (likeErr) {
                console.error("Error inserting like:", likeErr);
                return res.status(500).json(likeErr);
            }
            console.log("Like inserted successfully:", likeResult);

            // Query to get the count of likes for the specified postId
            const likeCountQuery = 'SELECT COUNT(*) AS likeCount FROM likes WHERE post_id = ?';

           
            connection.query(likeCountQuery, [postId], (countErr, results) => {
                if (countErr) {
                    console.error("Error fetching like count:", countErr);
                    return res.status(500).json(countErr);
                }

                // Extract likeCount from results
                const likeCount = results[0].likeCount;

                // Update the post table with the new like count
                const updatePostQuery = 'UPDATE post SET likes = ? WHERE postid = ?';

                // Execute the update query
                connection.query(updatePostQuery, [likeCount, postId], (updateErr, updateResult) => {
                    if (updateErr) {
                        console.error("Error updating like count in post table:", updateErr);
                        return res.status(500).json(updateErr);
                    }
                    console.log("Like count updated successfully:", updateResult);
                    return res.status(200).json({ message: "Post has been liked" });
                });
            });
        });
    });
};
*/

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

        const { postId } = req.body;
        const userId = user.id;

        // Check if the user has already liked the post before
        const checkLikeQuery = 'SELECT * FROM likes WHERE post_id = ? AND user_id = ?';
        connection.query(checkLikeQuery, [postId, userId], (checkErr, checkResult) => {
            if (checkErr) {
                console.error("Error checking like:", checkErr);
                return res.status(500).json(checkErr);
            }

            if (checkResult.length > 0) {
                // If the user has already liked the post before, perform unlike operation
                const deleteLikeQuery = 'DELETE FROM likes WHERE post_id = ? AND user_id = ?';
                connection.query(deleteLikeQuery, [postId, userId], (deleteErr, deleteResult) => {
                    if (deleteErr) {
                        console.error("Error deleting like:", deleteErr);
                        return res.status(500).json(deleteErr);
                    }
                    console.log("Like deleted successfully:", deleteResult);
                    // Update the like count in the post table
                    updateLikeCount(postId, res);
                });
            } else {
                // If the user has not liked the post before, perform like operation
                const insertLikeQuery = 'INSERT INTO `likes` (`post_id`, `user_id`) VALUES (?, ?)';
                connection.query(insertLikeQuery, [postId, userId], (insertErr, insertResult) => {
                    if (insertErr) {
                        console.error("Error inserting like:", insertErr);
                        return res.status(500).json(insertErr);
                    }
                    console.log("Like inserted successfully:", insertResult);
                    // Update the like count in the post table
                    updateLikeCount(postId, res);
                });
            }
        });
    });
};

function updateLikeCount(postId, res) {
    // Query to get the count of likes for the specified postId
    const likeCountQuery = 'SELECT COUNT(*) AS likeCount FROM likes WHERE post_id = ?';

    // Execute the query
    connection.query(likeCountQuery, [postId], (countErr, results) => {
        if (countErr) {
            console.error("Error fetching like count:", countErr);
            return res.status(500).json(countErr);
        }

        // Extract likeCount from results
        const likeCount = results[0].likeCount;

        // Update the post table with the new like count
        const updatePostQuery = 'UPDATE post SET likes = ? WHERE postid = ?';

        // Execute the update query
        connection.query(updatePostQuery, [likeCount, postId], (updateErr, updateResult) => {
            if (updateErr) {
                console.error("Error updating like count in post table:", updateErr);
                return res.status(500).json(updateErr);
            }
            console.log("Like count updated successfully:", updateResult);
            return res.status(200).json({ message: "Like operation performed successfully" });
        });
    });
}
