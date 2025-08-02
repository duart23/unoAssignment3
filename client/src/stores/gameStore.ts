import { apiCreateGame, apiJoinGame, apiGetGameById } from "@/api/useGameApi";
import { IGame, Player } from "@/interfaces/IGame";
import { IHand } from "@/interfaces/IHand";
import { defineStore } from "pinia";
import { usePlayerStore } from "./playerStore";

export const useGameStore = defineStore("game", {
  state: () => ({
    currentGame: null as IGame | null,
    players: [] as Player[],
    winner: undefined as Player | undefined,
    isGameOver: false,
  }),

  actions: {
    setCurrentGame(game: IGame) {
      this.currentGame = game;
      this.players = game.players;
      this.winner = game.winner;
    },

    startNewHand(players: Player[]) {
      if (this.currentGame && this.currentGame.currentHand) {
        this.currentGame.currentHand.startHand();
        console.log("New hand started:", this.currentGame.currentHand);
      }
    },
  },
   persist: true,
});
