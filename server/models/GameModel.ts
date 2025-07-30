import mongoose from "mongoose";
import { HandSchema } from "./HandModel";

const GameSchema = new mongoose.Schema(
  {
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
    gameId: { type: String, required: true, unique: true },
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      default: null,
    },
    gameState: {
      type: String,
      enum: ["waiting", "playing", "finished"],
      default: "waiting",
    },
    hands: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hand' }],
  },
  { timestamps: true }
);

const GameModel = mongoose.model("Game", GameSchema);

export default GameModel;
