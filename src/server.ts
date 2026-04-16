import app from "./app";

// It will use the PORT from your .env file, or default to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is flying on http://localhost:${PORT}`);
  console.log(`👉 Test the endpoint at http://localhost:${PORT}/api/profiles`);
});
