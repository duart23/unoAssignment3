import express from "express";
import { createPlayerHandler, loginPlayerHandler, updatePlayerHandler } from "../controllers/PlayerController";

const router = express.Router();

router.post("/create", createPlayerHandler);
router.post("/login", loginPlayerHandler);
router.put("/updatePlayer/:playerId", updatePlayerHandler);

export default router;
