const bcrypt = require('bcrypt');
const connection = require('../db');

module.exports = async (req, res) => {
    try {
        const { userid, password, cpassword } = req.body;

        // Regular expression for validating user ID format
        //const userIdRegex = /^[a-zA-Z][a-zA-Z0-9!@#$%^&*]{7,}$/;

        // Check if user ID, password, and confirm password are provided
        if (!userid || !password || !cpassword) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if password matches confirm password
        if (password !== cpassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        // Validate user ID format
        //if (!userIdRegex.test(userid)) {
           // return res.status(400).json({ error: 'Invalid user ID format' });
        //}

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user data into the database
        const insertUserSql = 'INSERT INTO task2db (email, password) VALUES (?, ?)';
        connection.query(insertUserSql, [userid, hashedPassword], (err, results) => {
            if (err) {
                console.error('Error registering user:', err);
                return res.status(500).json({ error: 'Error registering user' });
            }
            console.log('User registered successfully');
            res.status(200).json({ message: 'User registered successfully' });
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user' });
    }
};
