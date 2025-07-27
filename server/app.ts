import express from "express";
import cors from "cors";
import PlayerRoutes from "./routes/player.routes";
import GameRoutes from "./routes/game.routes";
import HandRoutes from "./routes/hand.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/players", PlayerRoutes);
app.use("/api/games", GameRoutes);
app.use("/api/hands", HandRoutes);

export default app;