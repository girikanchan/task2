/*const mysql = require('mysql2');

let mysqlconnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Giribaba@1968',
    database: 'userSocial'
});

mysqlconnection.connect((err) =>{
    if(err){
        console.log("Error while connecting:", err);
    } else {  
        console.log("Connected to the Database!");

        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS task2db (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                cpassword VARCHAR(255) NOT NULL
            )
        `;

        mysqlconnection.query(createTableQuery, (err, results) => {
            if (err) {
                console.error('Error creating table:', err);
            } else {
                console.log('Table created successfully');
            }
        });
    }
});

module.exports = mysqlconnection;
*/