import { ICard } from "../interfaces/IDeck";
import PlayerModel from "../models/PlayerModel";

export async function createPlayer(name: string, password: string) {
  const newPlayer = new PlayerModel({
    playerId: Math.floor(Math.random() * 1000000).toString(),
    name,
    password,
    isBot: false,
    score: 0,
  });

  await newPlayer.save();
  return newPlayer;
}

export async function loginPlayer(name: string, password: string) {
  return PlayerModel.findOne({ name, password }); // simple match, no hashing
}

export async function updatePlayer(
  playerId: string,
  updates: Partial<{
    score: number;
    playerHand: ICard[];
    hasCalledUno: boolean;
    isBot: boolean;
  }>
) {
  const player = await PlayerModel.findOne({ playerId });
  if (!player) throw new Error("Player not found");

  Object.assign(player, updates);
  await player.save();
  return player;
}