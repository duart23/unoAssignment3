import GameModel from "../models/GameModel";
import PlayerModel from "../models/PlayerModel";

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
  console.log('Saving game:', JSON.stringify(newGame, null, 2));

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
  const game = await GameModel.findOne({ gameId });
  if (!game) {
    throw new Error("Game not found");
  }

  const player = await PlayerModel.findOne({ playerId });
  if (!player) {
    throw new Error("Player not found");
  }

  if (player.gameId && player.gameId !== gameId) {
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



export async function getAllGames() {
  const games = await GameModel.find().populate('players');
  return games;
}


export async function getGameById(gameId: number) {
  const game = await GameModel.findOne({ gameId }).populate('players');
  if (!game) {
    throw new Error("Game not found");
  }
  return game;
}


export async function updateGame(
  gameId: string,
  updates: Partial<{
    players: any[];
    gameState: string;
    winner: any;
  }>
) {
  const game = await GameModel.findOne({ gameId });
  if (!game) throw new Error("Game not found");

  Object.assign(game, updates);
  await game.save();
  return game;
}
