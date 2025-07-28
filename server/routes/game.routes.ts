import express from "express";
import { createGameHandler, getAllGamesHandler, getGameByIdHandler, joinGameHandler, updateGameHandler } from "../controllers/GameController";


const router = express.Router();

router.post("/create", createGameHandler);
router.post("/join", joinGameHandler);
router.get("/", getAllGamesHandler);
router.get("/:gameId", getGameByIdHandler);
router.put("/updateGame/:gameId", updateGameHandler);

export default router;
