import { createHand, getHandById, updateHand } from "../services/HandService";
import { Request, Response } from "express";


export async function createHandHandler(req: Request, res: Response) {
  const { gameId } = req.body;
  try {
    const hand = await createHand(gameId);
    res.status(201).json(hand);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: errorMessage });
  }
}

export async function getHandByIdHandler(req: Request, res: Response) {
  const { handId } = req.params;
  try {
    const hand = await getHandById(handId);
    res.status(200).json(hand);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: errorMessage });
  }
}

export async function updateHandHandler(req: Request, res: Response) {
  const { handId } = req.params;
  const updates = req.body;
  try {
    const updatedHand = await updateHand(handId, updates);
    res.status(200).json(updatedHand);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: errorMessage });
  }
}