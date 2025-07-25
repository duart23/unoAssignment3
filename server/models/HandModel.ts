import mongoose from "mongoose";

export const HandSchema = new mongoose.Schema({
  currentPlayerIndex: { type: Number, required: true },
  deck: { type: Array, required: true },
  discardPile: { type: Array, required: true },
  direction: { type: Number, default: 1 },
});
