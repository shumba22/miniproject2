import express from "express";
import cors from "cors";   
import pool from "./routes/PoolConnections.js";
import UserInfo from "./routes/UserInfo.js";  // Updated to handle user information
import Roles from "./routes/Roles.js";  // Updated to handle roles
import People from "./routes/People.js"
import UserRoutes from "./routes/UserRoutes.js" // just a test route


const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//  route paths
app.use("/user", UserInfo); // Route for managing user information
app.use("/roles", Roles);  // Route for managing roles
app.use("/people",People);// Route for Managing the people(Athletes/Players)
app.use("/userRoute",UserRoutes);// just a test
app.use("/pool", pool); //Database Connection

// Home route
app.get("/", (req, res) => {
    try {
        res.send("Hello from Express Server");
    } catch (error) {
        console.error("Query error:", error);
        res.send("Sorry, error occurred.");
    }
});

app.listen(3000, () => console.log("Server ready on port 3000."));
