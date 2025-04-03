import pg from "pg";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables
const { Pool } = pg;
const PORT = process.env.PORT || 3000;
// PostgreSQL connection pool
 const PoolConnection = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Neon DB
  },
});
//** Connection/
PoolConnection.connect()
  .then((client) => {
    console.log("Connected to Neon PostgreSQL database!");
    client.release();
  })
  .catch((err) => console.error("Database connection error:", err.stack));
//**/
export default PoolConnection;