import express from "express";
import { createGameHandler, joinGameHandler } from "../controllers/GameController";

const router = express.Router();

router.post("/create", createGameHandler);
router.post("/join", joinGameHandler);

export default router;
