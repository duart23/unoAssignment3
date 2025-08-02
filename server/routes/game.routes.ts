import express from "express";
import { createGameHandler, getAllGamesHandler, getCurrentHandHandler, getGameByIdHandler, joinGameHandler, leaveGameHandler, updateGameHandler } from "../controllers/GameController";


const router = express.Router();

router.post("/create", createGameHandler);
router.post("/join", joinGameHandler);
router.get("/", getAllGamesHandler);
router.get("/:gameId", getGameByIdHandler);
router.put("/updateGame/:gameId", updateGameHandler);
router.put("/leave", leaveGameHandler);
router.get("/currentHand/:gameId", getCurrentHandHandler);

export default router;
