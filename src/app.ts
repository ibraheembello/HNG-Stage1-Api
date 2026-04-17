import express from "express";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import profileRoutes from "./routes/profile.routes";
import { swaggerSpec } from './utils/swagger';

const app = express();

// Middleware to enable CORS for all origins
app.use(cors({ origin: "*" }));

// Middleware to parse JSON bodies
app.use(express.json());

// Swagger UI Documentation with CDN assets for stability on Vercel
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css";

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: "HNG Stage 1 API Documentation",
  customCssUrl: CSS_URL,
  customJs: [
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js",
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js"
  ],
  swaggerOptions: {
    persistAuthorization: true,
  }
}));

// Mount the profile routes
app.use("/api/profiles", profileRoutes);

// A simple health check route
app.get("/", (req, res) => {
  res.status(200).json({ status: "success", message: "HNG Stage 1 API is live and running!" });
});

export default app;
