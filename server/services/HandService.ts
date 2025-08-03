import { ICard } from "../interfaces/IDeck";
import { Player } from "../interfaces/IGame";
import { IHand } from "../interfaces/IHand";
import GameModel from "../models/GameModel";
import HandModel from "../models/HandModel";


export async function createHand(_id: string) {
  const game = await GameModel.findById({ _id: _id });
  if (!game) throw new Error("Game not found");

  const hand = new HandModel({
    currentPlayerIndex: 0,
    deck: [],
    discardPile: [],
    direction: 1,
    winner: null,
    score: 0,
    game: game._id,
    players: game.players,
    playersHands: {},
  });

  // Save hand and attach it to the game
  await HandModel.create(hand);
  game.hands.push(hand._id);
  await game.save();

  return hand;
}

export async function getHandById(_id: string) {
  const hand = await HandModel.findOne({ _id: _id });
  if (!hand) throw new Error("Hand not found");
  return hand;
}

export async function updateHand(
  _id: string,
  updates: IHand
) {
  const hand = await HandModel.findOne({ _id: _id });
  if (!hand) throw new Error("Hand not found");

  Object.assign(hand, updates);
  await hand.save();
  return hand;
}

