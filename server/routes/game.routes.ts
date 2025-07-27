import express from "express";
import { createGameHandler, getAllGamesHandler, getGameByIdHandler, joinGameHandler } from "../controllers/GameController";


const router = express.Router();

router.post("/create", createGameHandler);
router.post("/join", joinGameHandler);
router.get("/", getAllGamesHandler);
router.get("/:gameId", getGameByIdHandler);

export default router;
