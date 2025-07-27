import { Deck } from "../logic/Deck";
import { Hand } from "../logic/Hand";
import GameModel from "../models/GameModel";
import HandModel from "../models/HandModel";


export async function createHand(gameId: string) {
  const deck = new Deck();
  deck.initializeDeck();
  deck.shuffleDeck();

  const game = await GameModel.findById(gameId).populate("players");
  if (!game) throw new Error("Game not found");

  const hand = new Hand({
    deck: deck.cards,
    discardPile: [deck.drawCard()],
    direction: 1,
    currentPlayerIndex: 0
  });

  // Optionally distribute cards using your logic class
  game.players.forEach(player => {
    player.playerHand = deck.drawCards(7);
    // Save player or do something else
  });

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
    deck: any[];
    discardPile: any[];
    direction: number;
    winner: any;
    score: number;
  }>
) {
  const hand = await HandModel.findOne({ _id: handId });
  if (!hand) throw new Error("Hand not found");

  Object.assign(hand, updates);
  await hand.save();
  return hand;
}

