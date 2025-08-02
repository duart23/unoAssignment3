import { ICard } from "../interfaces/IDeck";
import { Player } from "../interfaces/IGame";
import { IHand } from "../interfaces/IHand";
import GameModel from "../models/GameModel";
import HandModel from "../models/HandModel";


export async function createHand(gameId: string) {
  const game = await GameModel.findOne({ gameId: gameId });
  if (!game) throw new Error("Game not found");

  const hand = new HandModel({
    currentPlayerIndex: 0,
    deck: [],
    discardPile: [],
    direction: 1,
    winner: null,
    score: 0,
    gameId: gameId,
    players: game.players,
  });

  // Save hand and attach it to the game
  await HandModel.create(hand);
  game.hands.push(hand._id);
  await game.save();

  return hand;
}

export async function getHandById(handId: string) {
  const hand = await HandModel.findOne({ _id: handId });
  if (!hand) throw new Error("Hand not found");
  return hand;
}

export async function updateHand(
  handId: string,
  updates: IHand
) {
  const hand = await HandModel.findOne({ _id: handId });
  if (!hand) throw new Error("Hand not found");

  Object.assign(hand, updates);
  await hand.save();
  return hand;
}

