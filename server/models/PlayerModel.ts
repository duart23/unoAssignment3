import mongoose from "mongoose";

export const PlayerSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  score: { type: Number, default: 0 },
  isBot: { type: Boolean, default: false },
  game: { type: mongoose.Schema.Types.ObjectId, ref: "Game", default: null, required: false },
});

const Player = mongoose.model("Player", PlayerSchema);

export default Player;