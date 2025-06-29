import express from "express";
import userRoutes from "./routes/userRoutes";

const app = express();
const PORT = 3001;

app.post("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
