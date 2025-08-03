import mongoose from "mongoose";
import { ICard } from "../interfaces/IDeck";
import { Player } from "../interfaces/IGame";
import PlayerModel from "../models/PlayerModel";

export async function createPlayer(name: string, password: string) {
  const existingPlayer = await PlayerModel.findOne({ name });
if (existingPlayer) {
  throw new Error("Player with this name already exists.");
}
  const newPlayer = new PlayerModel({
    name,
    password,
    isBot: false,
    score: 0,
    game: null, 
  });

 try {
    await newPlayer.save();
    return newPlayer;
  } catch (err) {
    console.error("Failed to save player:", err);
    throw err;
  }
}

export async function loginPlayer(name: string, password: string) {
  return PlayerModel.findOne({ name, password }); 
}

export async function updatePlayer(
  _id: string,
  updates: Player 
) {
  const player = await PlayerModel.findOne({ _id });
  if (!player) throw new Error("Player not found");

  Object.assign(player, updates);
  await player.save();
  return player;
}

export async function getPlayerById(_id: string) {
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    throw new Error("Invalid player ID");
  }
  return PlayerModel.findById(_id);
}

export async function removeGameFromPlayer(_id: string) {
  const player = await PlayerModel.findById(_id);
  if (!player) throw new Error("Player not found");
    player.game = null;
    await player.save();
}

export async function getAllPlayersFromGame(gameId: string){
  return PlayerModel.find({ game: gameId });
}