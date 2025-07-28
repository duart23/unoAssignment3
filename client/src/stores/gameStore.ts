
import {
  apiCreateGame,
  apiJoinGame,
  apiGetGameById
} from "@/api/useGameApi";
import { IGame, Player } from "@/interfaces/IGame";
import { IHand } from "@/interfaces/IHand";
import { defineStore } from "pinia";
import { usePlayerStore } from "./playerStores";

export const useGameStore = defineStore("game", {
  state: () => ({
    players: [] as Player[],
    currentHand: null as IHand | null,
    winner: undefined as Player | undefined,
    isGameOver: false
  }),

  actions: {
    async createNewGame() {
      await apiCreateGame();
    },

    async joinGame(gameId: string) {
      const playerStore = usePlayerStore();
      const playerId = playerStore.playerId;
      if(!playerId) {
        throw new Error("No Player found");
      } 
      await apiJoinGame(playerId, gameId);
    },

  }
});
