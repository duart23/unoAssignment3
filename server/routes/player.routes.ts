import express from "express";
import { createPlayerHandler, getPlayerByIdHandler, loginPlayerHandler, updatePlayerHandler } from "../controllers/PlayerController";

const router = express.Router();

router.post("/create", createPlayerHandler);
router.post("/login", loginPlayerHandler);
router.put("/updatePlayer/:playerId", updatePlayerHandler);
router.put("/:playerId", getPlayerByIdHandler);

export default router;
