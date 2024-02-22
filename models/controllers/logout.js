const bcrypt = require('bcrypt');
const connection = require('../db');
const jwt = require('jsonwebtoken');
module.exports = async (req, res) => {


    res.clearCookie("accessToken",{
        secure:true,
        sameSite:  "none"
    }).status(200).json("user has been logged Out");
  /*
  try {
    
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).json({ error: 'Error logging out user' });
            }
            console.log('User logged out successfully');
            res.status(200).json({ message: 'User logged out successfully' });
        });
    } catch (error) {
        console.error('Error logging out user:', error);
        res.status(500).json({ error: 'Error logging out user' });
    }
    */
};
