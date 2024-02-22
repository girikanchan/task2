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

        const postquery = 'INSERT INTO post SET ?';

        const post = {
            id: user.id,
            name: req.body.name,
            description: req.body.description,
            img: req.body.img,
            updated_time: moment().format("YYYY-MM-DD HH:mm:ss")
        };

        connection.query(postquery, post, (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json("Post has been created");
        });
    });
};
