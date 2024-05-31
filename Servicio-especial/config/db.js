import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // tu usuario de MySQL
    password: '', // tu contraseña de MySQL
    port: 3306,
    database: 'reservas'
});

export default pool;
