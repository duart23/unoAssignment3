import { defineStore } from "pinia";
import { IGame, Player } from "@/interfaces/IGame";
import { IHand} from "@/interfaces/IHand";
import { Hand } from "@/model/Hand";
import { Game } from "@/model/Game";

export const useGameStore = defineStore("game", {
  state: () => ({
    winner: null as Player | null,
    currentHand: null as IHand | null,
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
      if (gameId) {
        this.currentHand = new Hand(players);
        this.currentHand.startHand(players);
      }
    },
    
    endGame(): void {
      
    },
  },
});
