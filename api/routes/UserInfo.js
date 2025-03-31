//Connect to the UserInfo table 
import express from "express";
const userInfo = express.Router();
import pool from "./PoolConnection.js";

// Retrieve all user information
userInfo.get("/userinfo", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM userinfo");
        res.json({ rows: result.rows });
    } catch (error) {
        console.error("Query error:", error);
        res.status(500).json({ error: "Database query failed" });
    }
});

// Retrieve a specific user by ID
userInfo.get("/getuser", async (req, res) => {
    try {
        var id1 = req.query.id;
        console.log(id1);
        const result = await pool.query("SELECT * FROM userinfo WHERE id=$1", [id1]);
        console.log(result);
        res.json({ rows: result.rows });
    } catch (error) {
        console.error("Query error:", error);
        res.json({ rows: [] });
    }
});

// Delete a specific user by ID
userInfo.get("/deluser", async (req, res) => {
    try {
        var id1 = req.query.id;
        console.log(id1);
        const result = await pool.query("DELETE FROM userinfo WHERE id=$1", [id1]);
        console.log(result);
        res.json({ ans: 1 });
    } catch (error) {
        console.error("Query error:", error);
        res.json({ ans: 0 });
    }
});

// Add a new user 
userInfo.post("/adduser", async (req, res) => {
    try {
        var user = req.body;
        var name = user.name;
        var age = user.age;
        var dob = user.dob;
        var birthCountry = user.birthCountry;
        var role = user.role;

        // Query to insert a new user
        const qry = "INSERT INTO userinfo (name, age, dob, birthCountry, role) VALUES ($1, $2, $3, $4, $5)";
        const result = await pool.query(qry, [name, age, dob, birthCountry, role]);

        console.log(result);
        res.json({ ans: 1 });
    } catch (error) {
        console.error("Query error:", error);
        res.json({ ans: 0 });
    }
});

// Update an existing user(their details)
userInfo.post("/updateUser", async (req, res) => {
    try {
        var user = req.body;
        var id = user.id; // User's ID to update
        var name = user.name;
        var age = user.age;
        var dob = user.dob;
        var birthCountry = user.birthCountry;
        var role = user.role;

        // Update query for a user
        const qry = "UPDATE userinfo SET name=$1, age=$2, dob=$3, birthCountry=$4, role=$5 WHERE id=$6";
        const result = await pool.query(qry, [name, age, dob, birthCountry, role, id]);

        console.log(result);
        res.json({ ans: 1 });
    } catch (error) {
        console.error("Query error:", error);
        res.json({ ans: 0 });
    }
});

export default userInfo;
