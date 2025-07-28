import { ICard } from "@/interfaces/IDeck";
import { defineStore } from "pinia";

export const usePlayerStore = defineStore("player", {
  state: () => ({
    name: "" as string,
    playerId: "" as string,
    playerHand: [] as ICard[],
    score: 0,
    isBot: false,
    hasCalledUno: false,
  }),
  actions: {


    setName(name: string) {
      this.name = name;
    },

    clearHand() {
      this.playerHand = [];
    },
    resetScore() {
      this.score = 0;
    },
  },
});
