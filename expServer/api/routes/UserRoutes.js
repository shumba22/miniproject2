import express from "express"; //Class - Testing Route
export const UserRoutes = express.Router();
import pool from "./PoolConnections.js"
userRouter.get("/",(req,res)=>{
    try { res.send("Hello from routes for user"); }
    catch (error) { console.error("Query error:", error);
    res.send(" Sorry Error")
   }
});
export default UserRoutes;