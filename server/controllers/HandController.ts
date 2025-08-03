import { createHand, getHandById, updateHand } from "../services/HandService";
import { Request, Response } from "express";


export async function createHandHandler(req: Request, res: Response) {
  const { _id } = req.body;
  try {
    const hand = await createHand(_id);
    res.status(201).json(hand);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Create hand failed:", error);
    res.status(500).json({ error: errorMessage });
  }
}

export async function getHandByIdHandler(req: Request, res: Response) {
  const { _id } = req.params;
  try {
    const hand = await getHandById(_id);
    res.status(200).json(hand);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: errorMessage });
  }
}

export async function updateHandHandler(req: Request, res: Response) {
  const { _id } = req.params;
  const updates = req.body;
  try {
    const updatedHand = await updateHand(_id, updates);
    res.status(200).json(updatedHand);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: errorMessage });
  }
}