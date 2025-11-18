import mysql from 'mysql2/promise';

export const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '', 
    database: 'agenda'
});




