import express from "express";
const roles = express.Router();
import pool from "./PoolConnection.js";

// Retrieve all roles
roles.get("/roles", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM roles");
        res.json({ rows: result.rows });
    } catch (error) {
        console.error("Query error:", error);
        res.status(500).json({ error: "Database query failed" });
    }
});

// Retrieve a specific role by ID
roles.get("/getrole", async (req, res) => {
    try {
        var id1 = req.query.id;
        console.log(id1);
        const result = await pool.query("SELECT * FROM roles WHERE id=$1", [id1]);
        console.log(result);
        res.json({ rows: result.rows });
    } catch (error) {
        console.error("Query error:", error);
        res.json({ rows: [] });
    }
});

// Delete a specific role by ID
roles.get("/delrole", async (req, res) => {
    try {
        var id1 = req.query.id;
        console.log(id1);
        const result = await pool.query("DELETE FROM roles WHERE id=$1", [id1]);
        console.log(result);
        res.json({ ans: 1 });
    } catch (error) {
        console.error("Query error:", error);
        res.json({ ans: 0 });
    }
});

// Add a new role (POST request)
roles.post("/addrole", async (req, res) => {
    try {
        var role = req.body;
        var name = role.name;
        var username = role.username;
        var email = role.email;
        var password = role.password;
        var roleStatus = role.role; // 0 for user, 1 for admin

        // Query to insert a new role
        const qry = "INSERT INTO roles (name, username, email, password, role) VALUES ($1, $2, $3, $4, $5)";
        const result = await pool.query(qry, [name, username, email, password, roleStatus]);

        console.log(result);
        res.json({ ans: 1 });
    } catch (error) {
        console.error("Query error:", error);
        res.json({ ans: 0 });
    }
});

// Update an existing role's details (POST request)
roles.post("/updateRole", async (req, res) => {
    try {
        var role = req.body;
        var id = role.id; // Role's ID to update
        var name = role.name;
        var username = role.username;
        var email = role.email;
        var password = role.password;
        var roleStatus = role.role;

        // Update query for a role
        const qry = "UPDATE roles SET name=$1, username=$2, email=$3, password=$4, role=$5 WHERE id=$6";
        const result = await pool.query(qry, [name, username, email, password, roleStatus, id]);

        console.log(result);
        res.json({ ans: 1 });
    } catch (error) {
        console.error("Query error:", error);
        res.json({ ans: 0 });
    }
});

export default roles;
