import express from "express";
import cors from "cors";
import profileRoutes from "./routes/profile.routes";

const app = express();

// Middleware to enable CORS for all origins
app.use(cors({ origin: "*" }));

// Middleware to parse JSON bodies
app.use(express.json());

// Mount the profile routes
app.use("/api/profiles", profileRoutes);

// A simple health check route
app.get("/", (req, res) => {
  res.status(200).json({ status: "success", message: "HNG Stage 1 API is live and running!" });
});

export default app;
