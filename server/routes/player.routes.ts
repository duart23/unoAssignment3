import express from "express";
import { createPlayerHandler, getPlayerByIdHandler, loginPlayerHandler, updatePlayerHandler } from "../controllers/PlayerController";

const router = express.Router();

router.post("/create", createPlayerHandler);
router.post("/login", loginPlayerHandler);
router.put("/updatePlayer/:_id", updatePlayerHandler);
router.put("/:_id", getPlayerByIdHandler);

export default router;
