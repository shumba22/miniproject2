//Connects to the people table(Rugby Athletes)
import express from "express";
const people = express.Router();
import pool from "./PoolConnection.js";

// Retrieve all people
people.get("/people", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM people");
        res.json({ rows: result.rows });
    } catch (error) {
        console.error("Query error:", error);
        res.status(500).json({ error: "Database query failed" });
    }
});

// Retrieve a specific person by ID
people.get("/getpeople", async (req, res) => {
    try {
        var id1 = req.query.id;
        console.log(id1);
        const result = await pool.query("SELECT * FROM people WHERE id=$1", [id1]);
        console.log(result);
        res.json({ rows: result.rows });
    } catch (error) {
        console.error("Query error:", error);
        res.json({ rows: [] });
    }
});

// Delete a specific person by ID
people.get("/delpeople", async (req, res) => {
    try {
        var id1 = req.query.id;
        console.log(id1);
        const result = await pool.query("DELETE FROM people WHERE id=$1", [id1]);
        console.log(result);
        res.json({ ans: 1 });
    } catch (error) {
        console.error("Query error:", error);
        res.json({ ans: 0 });
    }
});

// Add a new person (POST request)
people.post("/addperson", async (req, res) => {
    try {
        var person = req.body;
        var name = person.name;
        var age = person.age;
        var country = person.country;
        var nationality = person.nationality;
        var gender = person.gender;

        // Query to insert a new person
        const qry = "INSERT INTO people (name, age, country, nationality, gender) VALUES ($1, $2, $3, $4, $5)";
        const result = await pool.query(qry, [name, age, country, nationality, gender]);

        console.log(result);
        res.json({ ans: 1 });
    } catch (error) {
        console.error("Query error:", error);
        res.json({ ans: 0 });
    }
});

// Update an existing person information
people.post("/updatePerson", async (req, res) => {
    try {
        var person = req.body;
        var id = person.id; // Person's ID to update
        var name = person.name;
        var age = person.age;
        var country = person.country;
        var nationality = person.nationality;
        var gender = person.gender;

        // Update query- Person/People
        const qry = "UPDATE people SET name=$1, age=$2, country=$3, nationality=$4, gender=$5 WHERE id=$6";
        const result = await pool.query(qry, [name, age, country, nationality, gender, id]);

        console.log(result);
        res.json({ ans: 1 });
    } catch (error) {
        console.error("Query error:", error);
        res.json({ ans: 0 });
    }
});

export default people;
