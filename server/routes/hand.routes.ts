import express from "express";
import { createHandHandler, getHandByIdHandler, updateHandHandler } from "../controllers/HandController";

const router = express.Router();

router.post("/create", createHandHandler);
router.get("/:_id", getHandByIdHandler);
router.put("/updateHand/:_id", updateHandHandler);

export default router;
