import { Request, Response } from "express";
import { createGame, getAllGames, getCurrentHand, getGameById, joinGame, leaveGame, updateGame } from "../services/GameService";

export async function createGameHandler(req: Request, res: Response) {
  try {
    const game = await createGame();
    res.status(201).json(game);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: errorMessage });
  }
}


export async function joinGameHandler(req: Request, res: Response) {
  try {
    const { playerId, gameId } = req.body;
    if (!playerId || !gameId) {
      return res.status(400).json({ error: "Player ID and Game ID are required" });
    }
    const game = await joinGame(playerId, gameId);
    res.status(200).json(game);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: errorMessage });
  }
}

export async function getAllGamesHandler(req: Request, res: Response) {
  try {
    const games = await getAllGames();
    res.status(200).json(games);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: errorMessage });
  }
}

export async function getGameByIdHandler(req: Request, res: Response) {
  const { gameId } = req.params;
  try {
    const game = await getGameById(gameId);
    res.status(200).json(game);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: errorMessage });
  }
}

export async function updateGameHandler(req: Request, res: Response) {
  const { gameId } = req.params;
  const updates = req.body;
  try {
    const updatedGame = await updateGame(gameId, updates);
    res.status(200).json(updatedGame);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: errorMessage });
  }
}

export async function leaveGameHandler(req: Request, res: Response) {
  const { playerId, gameId } = req.body;
  try {
    await leaveGame(playerId, gameId);
    res.status(200).json({ message: "Player left the game successfully" });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: errorMessage });
  }
}

export async function getCurrentHandHandler(req: Request, res: Response) {
  const { gameId } = req.params;
  try {
    const currentHand = await getCurrentHand(gameId);
    res.status(200).json(currentHand);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: errorMessage });
  }
}
