import express from "express";
import { createPlayerHandler, loginPlayerHandler } from "../controllers/PlayerController";

const router = express.Router();

router.post("/create", createPlayerHandler);
router.post("/login", loginPlayerHandler);

export default router;
