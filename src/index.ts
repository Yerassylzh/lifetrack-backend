import "./config/env";
import express from "express";
import authRoutes from "./routes/authRoutes";
import { authMiddleware } from "./middlewares/authMiddleware";
import { Response, Request } from "express";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use("/api/private", authMiddleware);

app.use("/api/public/auth", authRoutes);

app.get("/health", (req: Request, res: Response) => {
  res.json({ alive: true }).status(200);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
