import { Request, Response } from "express";
import * as playerService from "../services/PlayerService";
import { getPlayerById } from "../services/PlayerService";
import { responseEncoding } from "axios";

export async function createPlayerHandler(req: Request, res: Response) {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      return res.status(400).json({ error: "Player name and password are required" });
    }
    const player = await playerService.createPlayer(name, password);
    res.status(201).json(player);
  } catch (error: any) {
  if (error.code === 11000) {
    return res.status(400).json({ error: "Player with that name already exists" });
  }
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

export async function updatePlayerHandler(req: Request, res: Response) {
  const { _id } = req.params;
  const updates = req.body;
  try {
    const updatedPlayer = await playerService.updatePlayer(_id, updates);
    res.status(200).json(updatedPlayer);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: errorMessage });
  }
}

export async function getPlayerByIdHandler(req: Request, res: Response) {
  const { _id } = req.params;
  if (!_id) return res.status(400).json({ error: "Missing player ID" });

  try {
    const player = await getPlayerById(_id); 
    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }
    res.status(200).json(player);
  } catch (error) {
    console.error("Error fetching player:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}


export async function getAllPlayersFromGameHandler(req: Request, res: Response) {
  const { gameId } = req.params;

  if (!gameId) return res.status(400).json({ error: "Missing game ID" });
  try {
    const players = await playerService.getAllPlayersFromGame(gameId);
    res.status(200).json(players);
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
