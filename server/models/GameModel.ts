import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  score: { type: Number, default: 0 },
  isReady: { type: Boolean, default: false },
});

const GameSchema = new mongoose.Schema({
  players: [PlayerSchema],
  currentTurn: { type: Number, default: 0 },
  gameState: { type: String, enum: ["waiting", "playing", "finished"], default: "waiting" },
});

const GameModel = mongoose.model("Game", GameSchema);

export default GameModel;
