import { ICard } from "../interfaces/IDeck";
import { Player } from "../interfaces/IGame";
import { Deck } from "../logic/Deck";
import { Hand } from "../logic/Hand";
import GameModel from "../models/GameModel";
import HandModel from "../models/HandModel";


export async function createHand(gameId: string) {
  const game = await GameModel.findById(gameId);
  if (!game) throw new Error("Game not found");

  const hand = new HandModel({
    handId: Math.floor(Math.random() * 1000000).toString(), 
    currentPlayerIndex: 0,
    deck: [],
    discardPile: [],
    direction: 1,
    winner: null,
    score: 0,
    gameId: game.gameId,
  });

  // Save hand and attach it to the game
  await HandModel.create(hand);
  game.hands.push(hand._id);
  await game.save();

  return hand;
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

