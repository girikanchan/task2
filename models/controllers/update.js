const bcrypt = require('bcrypt');
const connection = require('../db');

module.exports = async (req, res) => {
    try {
        const { userid, oldPassword, newPassword, confirmNewPassword } = req.body;

        // Check if user ID and passwords are provided
        if (!userid || !oldPassword || !newPassword || !confirmNewPassword) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if new password matches confirm new password
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ error: 'New passwords do not match' });
        }

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

            // Update user's password in the database
            const updatePasswordSql = 'UPDATE task2db SET password = ? WHERE email = ?';
            connection.query(updatePasswordSql, [hashedNewPassword, userid], (err, results) => {
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
};
