import express from "express";
import cors from "cors";   
import pool from "./routes/PoolConnections.js";
import userInfoRouter from "./routes/UserInfoRoute.js";  // Updated to handle user information
import rolesRouter from "./routes/RolesRoute.js";  // Updated to handle roles
import peopleRouter from "./routes/People.js"
import UserRoutes from "./routes/UserRoutes.js" // just a test route


const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//  route paths
app.use("/user", userInfoRouter); // Route for managing user information
app.use("/roles", rolesRouter);  // Route for managing roles
app.use("/people",peopleRouter);// Route for Managing the people(Athletes/Players)
app.use("/userRoute",UserRoutes);// just a test

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
