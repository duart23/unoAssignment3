import { defineStore } from "pinia";
import { IGame, Player } from "@/interfaces/IGame";
import { Hand } from "@/model/Hand";
import { Game } from "@/model/Game";
import { Bot } from "@/model/Bot";

export const useGameStore = defineStore("game", {
  state: () => ({
    winner: null as Player | null,
    isGameOver: false as boolean,
    game: null as IGame | null,
    players: [] as Player[],
  }),

  actions: {
    createGame(players: Player[]) {
      const gameId = Math.floor(Math.random() * 10000);
      this.game = new Game(players, gameId);
    },

    joinGame(gameId: number, players: Player[]): void {
      if (!gameId) {
        throw new Error("Game does not exist!");
      }
      players.forEach(player => {
        this.game?.players.push(player);
      });
    },

    startGame(players: Player[]): void {
      if (players.length < 2) {
        throw new Error("Not enough players to start the game!");
      }
      if (this.game) {
        this.game.currentHand = new Hand(players);
        this.game.currentHand.startHand(players);
      }
    },

    endGame(player: Player): void {
      console.log(`${player.name} wins the hand!`);
      const isGameOver = this.game?.endHand(player); //This caluclates the total score, checks if the game is over and resets the hand

      if (isGameOver === true) {
        this.winner = player;
      }
    },

    checkBotTurn(player: Player): void {
        setTimeout(() => {
          if (player instanceof Bot) {
            player.botTakeTurn();
          } else {
            console.warn(
              "Player is marked as bot but is not an instance of Bot."
            );
          }
        }, 1000);
      }
    },
  },
);
