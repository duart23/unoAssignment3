import GameModel from "../models/GameModel";
import PlayerModel from "../models/PlayerModel";

export async function createGame() {
  const newGame = new GameModel({
    gameId: Math.floor(Math.random() * 1000000).toString(),
    players: [],
    gameState: "waiting",
    winner: null,
    hands: [],
  });

  await newGame.save();
  return newGame;
}

export async function joinGame(playerId: string, gameId: number) {
  const game = await GameModel.findOne({ gameId });
  if (!game) {
    throw new Error("Game not found");
  }
  console.log(`Joining game ${gameId} with player ID ${playerId}`);
  const player = await PlayerModel.findOne({ playerId });
if (!player) {
    throw new Error("Player not found");
}
if (game.players.includes(player._id)) {
    throw new Error("Player already joined this game");
}
  console.log(`Player ${player.name} is joining game ${gameId}`);
  game.players.push(player._id);
  await game.save();
  return game;
}

export async function getAllGames() {
  const games = await GameModel.find();
  return games;
}

export async function getGameById(gameId: number) {
  const game = await GameModel.findOne({ gameId });
  if (!game) {    
    throw new Error("Game not found");
  }
  return game;
}
