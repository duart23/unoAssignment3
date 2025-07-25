import PlayerModel from "../models/PlayerModel";

export async function createPlayer(name: string, password: string) {
  const newPlayer = new PlayerModel({
    playerId: Math.floor(Math.random() * 1000000),
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

