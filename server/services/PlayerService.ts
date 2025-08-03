import { ICard } from "../interfaces/IDeck";
import { Player } from "../interfaces/IGame";
import PlayerModel from "../models/PlayerModel";

export async function createPlayer(name: string, password: string) {
  const newPlayer = new PlayerModel({
    name,
    password,
    isBot: false,
    score: 0,
    playerHand: [] as ICard[],
    game: null, 
  });

  await newPlayer.save();
  return newPlayer;
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

export async function getPlayerById(playerId: string) {
  return PlayerModel.findOne({ playerId });
}

export async function removeGameFromPlayer(_id: string) {
  const player = await PlayerModel.findById({ _id });

  if (!player) throw new Error("Player not found");
    player.game = null;
    await player.save();
}