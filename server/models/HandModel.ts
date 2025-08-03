import mongoose from "mongoose";
import { ICard } from "../interfaces/IDeck";

export const HandSchema = new mongoose.Schema({
  currentPlayerIndex: { type: Number, required: true },
  deck: { type: Array<ICard>, required: true },
  discardPile: { type: Array<ICard>, required: true },
  direction: { type: Number, default: 1 },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
    default: null,
  },
  score: { type: Number, default: 0 },
  game: { type: mongoose.Schema.Types.ObjectId, ref: "Game", default: null },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
  playersHands: {
    type: Map,
    of: [Object],
    default: {},
  },
});

const HandModel = mongoose.model("Hand", HandSchema);

export default HandModel;
