import { Request, Response } from "express";
import * as playerService from "../services/PlayerService";

export async function createPlayerHandler(req: Request, res: Response) {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      return res.status(400).json({ error: "Player name and password are required" });
    }
    const player = await playerService.createPlayer(name, password);
    res.status(201).json(player);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: errorMessage });
  }
}

export async function loginPlayerHandler(req: Request, res: Response) {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      return res.status(400).json({ error: "Player name and password are required" });
    }
    const player = await playerService.loginPlayer(name, password);
    if (!player) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.status(200).json(player);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: errorMessage });
  }
}
