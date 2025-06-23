<script setup lang="ts">
import { ref } from "vue";
import { useGameStore } from "@/stores/gameStore";
import { useRouter } from "vue-router";
import type { Player } from "@/interfaces/IGame";

const gameStore = useGameStore();
const router = useRouter();

const playerName = ref("");
const players: Player[] = [];

const nrOfBots = ref(1);

  function createPlayer(name: string) {
    const player: Player = {
      name,
      playerHand: [],
      score: 0,
      hasCalledUno: false,
      isBot: false,
    };
    players.push(player);
  }

  function createBots(nrOfBots: number) {
    for (let i = 0; i < nrOfBots; i++) {
      const botName = `Bot ${i + 1}`;
      const player: Player = {
        name: botName,
        playerHand: [],
        score: 0,
        hasCalledUno: false,
        isBot: true,
      };
      players.push(player);
    }
  }

  function createGame() {
    createPlayer(playerName.value)
    createBots(nrOfBots.value);
    gameStore.createGame(players);
    router.push("/game");
  }

</script>

<template>
  <div>
    <h1>UNO Setup</h1>
    <input v-model="playerName" type="text" placeholder="Enter your name" />

    <select v-model="nrOfBots">
      <option value="" disabled selected>Select number of bots</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>

    <Button @click="createGame">Create Game</Button>

  </div>
</template>
