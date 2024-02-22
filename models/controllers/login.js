const bcrypt = require('bcrypt');
const connection = require('../db');
const jwt = require('jsonwebtoken');
module.exports = async (req, res) => {
    try {
        const { userid, password } = req.body;

        // Check if email and password are provided
        if (!userid || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Query database to find user by email
        const getUserQuery = 'SELECT * FROM task2db WHERE email = ?';
        connection.query(getUserQuery, [userid], async (err, results) => {
            if (err) {
                console.error('Error retrieving user:', err);
                return res.status(500).json({ error: 'Error retrieving user' });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            const user = results[0];

            // Compare the provided password with the hashed password from the database
            const isPasswordMatch = await bcrypt.compare(password, user.password);

            if (!isPasswordMatch) {
                // Passwords don't match
                return res.status(401).json({ error: 'Incorrect email or password' });
            }

            //const {password, ...others} = user
            const token = jwt.sign({id:user.id},"secretkey" ,{ expiresIn: "1d"});
            
            // Send back a JSON response with JWT
            
            /*
            res.status(200).json({
                message: `Logged in as ${user.email}`,
                token,
                id: user.id,
                username: user.username
            })
        */
            res.cookie("accessToken",token,{
                httpOnly:true
            }).status(200).json(user);

            
            // Password is correct, login successful
            console.log('User logged in successfully');
            //res.status(200).json({ message: 'User logged in successfully', user: { id: user.id, userid: user.userid } });
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Error logging in user' });
    }
};