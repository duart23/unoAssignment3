import { ICard } from "@/interfaces/IDeck";
import { IGame } from "@/interfaces/IGame";
import { Player } from "@/interfaces/IGame";
import { defineStore } from "pinia";

export const usePlayerStore = defineStore("player", {
  state: () => ({
    player: {
      name: "" as string,
      score: 0 as number,
      isBot: false as boolean,
      _id: "",
      password: "",
      game: {} as IGame | null,
    },
    players: [] as Player[]
  }),
  actions: {

    setPlayer(player: Player) {
        this.player = player;
    },

    leaveGame(){
      this.player.game = null;
    },

    setGame(game: IGame) {
      if (this.player) {
        this.player.game = game;
      } else {
        console.error("Player not set, cannot assign game.");
      }
    },

    setPlayers(players: Player[]) {
      this.players = players;
      }

  },
  persist: true,
});
