import app from "./app";

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server is flying on http://localhost:${PORT}`);
    console.log(`👉 Test the endpoint at http://localhost:${PORT}/api/profiles`);
  });
}

export default app;
