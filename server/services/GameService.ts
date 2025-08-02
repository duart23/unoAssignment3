import { IHand } from "../interfaces/IHand";
import GameModel from "../models/GameModel";
import PlayerModel from "../models/PlayerModel";
import { removeGameFromPlayer } from "./PlayerService";

export async function createGame() {
  console.log("🟡 createGame called");
  const newGame = new GameModel({
    players: [],
    gameId: Math.floor(Math.random() * 1000000).toString(),
    winner: null,
    gameState: "waiting",
    hands: [],
  });

  console.log("🔵 Game document before save:", newGame);
  console.log("Saving game:", JSON.stringify(newGame, null, 2));

  try {
    const savedGame = await newGame.save();
    console.log("🟢 Game successfully saved:", savedGame);
    return savedGame;
  } catch (err) {
    console.error("🔴 Error saving game:", err);
    throw err; // re-throw to catch it in the handler
  }
}

export async function joinGame(playerId: string, gameId: string) {
  console.log(
    `🟡 joinGame called with playerId: ${playerId}, gameId: ${gameId}`
  );
  const game = await GameModel.findOne({ gameId });
  if (!game) {
    throw new Error("Game not found");
  }

  const player = await PlayerModel.findOne({ playerId });
  if (!player) {
    throw new Error("Player not found");
  }

  if (
    player.gameId !== "none" &&
    player.gameId !== null &&
    player.gameId !== gameId
  ) {
    console.error("Player is already in another game");
    throw new Error("Player is already in another game");
  }

  if (game.players.includes(player._id)) {
    return game;
  }

  // Add player to game and update player's gameId
  game.players.push(player._id);
  player.gameId = gameId;

  await player.save();
  await game.save();

  return game;
}

export async function leaveGame(playerId: string, gameId: string) {
  await removeGameFromPlayer(playerId);
  const game = await GameModel.findOne({ gameId });
  if (!game) {
    throw new Error("Game not found");
  }
  game.players = game.players.filter(
    (player) => player.toString() !== player._id.toString()
  );
  console.log(`🟢 Player ${playerId} left game ${gameId}`);
  await game.save();
}

export async function getAllGames() {
  const games = await GameModel.find().populate("players");
  return games;
}

export async function getGameById(gameId: number) {
  const game = await GameModel.findOne({ gameId }).populate("players");
  if (!game) {
    throw new Error("Game not found");
  }
  return game;
}

export async function updateGame(
  gameId: string,
  updates: Partial<{
    players?: any[];
    gameState?: string;
    winner?: any;
    currentHand?: IHand;
  }>
) {
  const game = await GameModel.findOne({ gameId });
  if (!game) {
    console.error("🚫 Game not found with ID:", gameId);
    throw new Error("Game not found");
  }
  Object.assign(game, updates);

  try {
    await game.save();
  } catch (err) {
    console.error("💥 Mongoose Save Error:", err);
    throw err;
  }
  console.log("🟢 Game successfully updated:", game);
  return game;
}

export async function getCurrentHand(gameId: string) {
  const game = await GameModel.findOne({ gameId }).populate("currentHand");
  if (!game) {
    throw new Error("Game not found");
  }
  if (!game.currentHand) {
    throw new Error("No current hand in this game");
  }
  return game.currentHand;
}

