import mongoose from "mongoose";

export const PlayerSchema = new mongoose.Schema({
  playerId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  score: { type: Number, default: 0 },
  isBot: { type: Boolean, default: false },
  playerHand: { type: Array, default: [] },
  gameId: { type: mongoose.Schema.Types.String, ref: "GameId", default: null }
});

const Player = mongoose.model("Player", PlayerSchema);

export default Player;