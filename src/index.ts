import "./config/env";
import express from "express";
import authRoutes from "./routes/authRoutes";
import { authMiddleware } from "./middlewares/authMiddleware";
import { Response, Request } from "express";
import statsRouter from "./routes/statsRouter";

const app = express();
const PORT = 3001;

app.use(express.json());

app.use("/api/public/auth", authRoutes);

app.use("/api/private", authMiddleware);
app.use("/api/private/stats", statsRouter);

app.get("/health", (req: Request, res: Response) => {
  res.json({ alive: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
