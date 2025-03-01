import express from "express";
import bodyParser from "body-parser";
import patientRoutes from "./routers/router.patient.js";
import dotenv from "dotenv";
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Use patient routes
app.use("/api", patientRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});