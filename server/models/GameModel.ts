import mongoose from "mongoose";
import { HandSchema } from "./HandModel";

const GameSchema = new mongoose.Schema(
  {
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      default: null,
    },
    gameState: {
      type: String,
      enum: ["waiting", "in-progress", "finished"],
      default: "waiting",
    },
    hands: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hand" }],
    currentHand: { type: mongoose.Schema.Types.ObjectId, ref: "Hand", default: null },
  },
  { timestamps: true }
);

const GameModel = mongoose.model("Game", GameSchema);

export default GameModel;
