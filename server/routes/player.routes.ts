import express from "express";
import { createPlayerHandler, getAllPlayersFromGameHandler, getPlayerByIdHandler, loginPlayerHandler, updatePlayerHandler } from "../controllers/PlayerController";

const router = express.Router();

router.post("/create", createPlayerHandler);
router.post("/login", loginPlayerHandler);
router.put("/updatePlayer/:_id", updatePlayerHandler);
router.get("/:_id", getPlayerByIdHandler);
router.get("/game/:gameId", getAllPlayersFromGameHandler);

export default router;
