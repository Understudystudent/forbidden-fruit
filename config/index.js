import { createPool } from "mysql";
import { config } from "dotenv";

config();

const connectionPool = createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    multipleStatements: true,
    connectionLimit: 30
});

export { connectionPool };
