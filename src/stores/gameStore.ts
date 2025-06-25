import { defineStore } from "pinia";
import { IGame, Player } from "@/interfaces/IGame";
import { Hand } from "@/model/Hand";
import { Game } from "@/model/Game";

export const useGameStore = defineStore("game", {
  state: () => ({
    winner: null as Player | null,
    isGameOver: false as boolean,
    game: null as IGame | null,
  }),

  actions: {
    createGame(players: Player[]) {
      const gameId = Math.floor(Math.random() * 10000);
      this.game = new Game(players, gameId)
    },

    joinGame(gameId: number, player: Player): void {
      if (!gameId) {
        throw new Error("Game does not exist!");
      }
      this.game?.players.push(player);
    },

    startGame(players: Player[], gameId: number): void {
      if (players.length < 2) {
        throw new Error("Not enough players to start the game!");
      }
      if (this.game) {
        this.game.currentHand = new Hand(players);
        this.game.currentHand.startHand(players);
      }
    },
    
    endGame(player: Player): void {
      this.game?.endHand(player);
    },
  },
});
