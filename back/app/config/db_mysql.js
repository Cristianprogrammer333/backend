import { createPool } from "mysql2/promise";
import { config } from "dotenv";
config();

export const pool = createPool({
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    database: process.env.MYSQLDATABASE
});