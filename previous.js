/*const express = require('express');
const  app = express();
const connection = require('./connection');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');


app.use(express.static('./template'))
app.use(express.static('./javascript'))
app.use(express.static('./style'))
app.use(express.static('./model'))
app.use(express.static('./controller'))


app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//code for registering  a new user
app.post('/register', async (req, res) => {
    const { userid, password, cpassword } = req.body;

    // Check if user ID, password, and confirm password are provided
    if (!userid || !password || !cpassword) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if password matches confirm password
    if (password !== cpassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    try {
        // Check if the user already exists in the database
        const checkUserSql = 'SELECT * FROM task2db WHERE email = ?';
        connection.query(checkUserSql, [userid], async (err, results) => {
            if (err) {
                console.error('Error checking user:', err);
                return res.status(500).json({ error: 'Error checking user' });
            }

            if (results.length > 0) {
                return res.status(400).json({ error: 'Email already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            const chashedPassword = await bcrypt.hash(cpassword, 10);

            // Insert user data into the database
            const insertUserSql = 'INSERT INTO task2db (email, password,cpassword) VALUES (?, ?,?)';
            connection.query(insertUserSql, [userid, hashedPassword,chashedPassword], (err, results) => {
                if (err) {
                    console.error('Error registering user:', err);
                    return res.status(500).json({ error: 'Error registering user' });
                }
                console.log('User registered successfully');
                res.status(200).json({ message: 'User registered successfully' });
            });
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user' });
    }
});

//code for logging in a application
app.post('/login', async (req, res) => {
    const { userid, password } = req.body;

    try {
        // Check if user ID and password are provided
        if (!userid || !password) {
            return res.status(400).json({ error: 'User ID and password are required' });
        }

        // Retrieve user from the database
        const sql = 'SELECT * FROM task2db WHERE email = ?';
        connection.query(sql, [userid], async (err, results) => {
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
                return res.status(401).json({ error: 'Incorrect user ID or password' });
            }

            // Password is correct, login successful
            console.log('User logged in successfully');
            res.status(200).json({ message: 'User logged in successfully' });
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Error logging in user' });
    }
});

// Code for user logout
app.post('/logout', (req, res) => {
    
    res.status(200).json({ message: 'Logout successful' });
});

// code for updating user password
app.put('/update-password', async (req, res) => {
    const { userid, oldPassword, newPassword, confirmNewPassword } = req.body;

    // Check if user ID and passwords are provided
    if (!userid || !oldPassword || !newPassword || !confirmNewPassword) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if new password matches confirm new password
    if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ error: 'New passwords do not match' });
    }

    try {
        // Fetch user data from the database
        const getUserSql = 'SELECT * FROM task2db WHERE email = ?';
        connection.query(getUserSql, [userid], async (err, results) => {
            if (err) {
                console.error('Error fetching user:', err);
                return res.status(500).json({ error: 'Error fetching user' });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            const user = results[0];

            // Check if old password matches the hashed password stored in the database
            const passwordMatch = await bcrypt.compare(oldPassword, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Incorrect old password' });
            }

            // Hash the new password
            const hashedNewPassword = await bcrypt.hash(newPassword, 10);
            const hashedCNewPassword = await bcrypt.hash(confirmNewPassword, 10);

            // Update user's password in the database
            const updatePasswordSql = 'UPDATE task2db SET password = ?,cpassword = ? WHERE email = ?';
            connection.query(updatePasswordSql, [hashedNewPassword,hashedCNewPassword, userid], (err, results) => {
                if (err) {
                    console.error('Error updating password:', err);
                    return res.status(500).json({ error: 'Error updating password' });
                }
                console.log('Password updated successfully');
                res.status(200).json({ message: 'Password updated successfully' });
            });
        });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ error: 'Error updating password' });
    }
});



app.listen(3000, () => { 
    console.log("Server is running on port 3000") 
});

*/