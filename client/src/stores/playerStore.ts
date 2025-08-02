import { ICard } from "@/interfaces/IDeck";
import { Player } from "@/interfaces/IGame";
import { defineStore } from "pinia";

export const usePlayerStore = defineStore("player", {
  state: () => ({
    player: {
      name: "" as string,
      playerId: "" as string,
      playerHand: [] as ICard[],
      score: 0 as number,
      isBot: false as boolean,
      hasCalledUno: false as boolean,
      _id: "",
      password: "",
      gameId: "" as string | "none" | null, 
    }
  }),
  actions: {

    setPlayer(player: Player) {
        this.player = player;
    },
  },
  persist: true,
});
