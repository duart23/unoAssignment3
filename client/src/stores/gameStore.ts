import { IGame, Player } from "../interfaces/IGame";
import { defineStore } from "pinia";

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

    startNewHand() {
      if (this.currentGame && this.currentGame.currentHand) {
        this.currentGame.currentHand.startHand();
        console.log("New hand started:", this.currentGame.currentHand);
      }
    },

    reset() {
      this.currentGame = null;
      this.players = [];
      this.winner = undefined;
      this.isGameOver = false;
    }
  },
   persist: true,
});
