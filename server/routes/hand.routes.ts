import express from "express";
import { createHandHandler, getHandByIdHandler, updateHandHandler } from "../controllers/HandController";

const router = express.Router();

router.post("/create", createHandHandler);
router.get("/:handId", getHandByIdHandler);
router.put("/updateHand/:handId", updateHandHandler);

export default router;
