import { ICard } from "../interfaces/IDeck";
import { Player } from "../interfaces/IGame";
import { Deck } from "../logic/Deck";
import { Hand } from "../logic/Hand";
import GameModel from "../models/GameModel";
import HandModel from "../models/HandModel";


export async function createHand(gameId: string) {
  const game = await GameModel.findById(gameId);
  if (!game) throw new Error("Game not found");

  const hand = new Hand(gameId);

  // Save hand and attach it to the game
  const newHand = await HandModel.create(hand);
  game.hands.push(newHand._id);
  await game.save();

  return newHand;
}

export async function getHandById(handId: string) {
  const hand = await HandModel.findOne({ handId });
  if (!hand) throw new Error("Hand not found");
  return hand;
}

export async function updateHand(
  handId: string,
  updates: Partial<{
    currentPlayerIndex: number;
    deck: ICard[];
    discardPile: ICard[];
    direction: number;
    winner: Player;
    score: number;
  }>
) {
  const hand = await HandModel.findOne({ _id: handId });
  if (!hand) throw new Error("Hand not found");

  Object.assign(hand, updates);
  await hand.save();
  return hand;
}

