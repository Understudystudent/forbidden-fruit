import { createPool } from "mysql";
import { config } from "dotenv";

config();

let connection;

try {
    connection = createPool({
        host: process.env.DB_HOST,
        database: process.env.DB_Name,
        user: process.env.DB_UserName,
        password: process.env.DB_userPass,
        multipleStatement: true,
        connectionLimit: 30,
    });
} 
catch
 (error) {
    console.error("Error creating database connection:", error);
}

export {
     connection
     };
