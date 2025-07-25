import mongoose from "mongoose";

export const PlayerSchema = new mongoose.Schema({
  playerId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  score: { type: Number, default: 0 },
  isBot: { type: Boolean, default: false },
});

const Player = mongoose.model("Player", PlayerSchema);

export default Player;