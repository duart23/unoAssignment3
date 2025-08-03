import express from "express";
import { createGameHandler, getAllGamesHandler, getCurrentHandHandler, getGameByIdHandler, joinGameHandler, leaveGameHandler, updateGameHandler } from "../controllers/GameController";


const router = express.Router();

router.post("/create", createGameHandler);
router.post("/join", joinGameHandler);
router.get("/", getAllGamesHandler);
router.get("/:_id", getGameByIdHandler);
router.put("/updateGame/:_id", updateGameHandler);
router.put("/leave", leaveGameHandler);
router.get("/currentHand/:_id", getCurrentHandHandler);

export default router;
