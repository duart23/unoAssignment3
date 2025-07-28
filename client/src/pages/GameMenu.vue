<script setup lang="ts">
import { ref } from "vue";
import { useGameStore } from "@/stores/gameStore";
import { useRouter } from "vue-router";
import type { IGame, Player } from "@/interfaces/IGame";
import { Bot } from "@/model/Bot";
import { apiGetAllGames } from "@/api/useGameApi";

const gameStore = useGameStore();
const router = useRouter();

const listOfGames = await apiGetAllGames();
console.log(listOfGames);

// const nrOfBots = ref(1);
// function createBots(nrOfBots: number, game: IGame) {
//   for (let i = 0; i < nrOfBots; i++) {
//     const botName = `Bot ${i + 1}`;
//     const bot = new Bot(botName, game);
//     gameStore.players.push(bot);
//   }
// }

function createGame() {
  gameStore.createNewGame();
}
</script>

<template>
  <div>
    <h1>Welcome to UNO!</h1>

    <div v-for="game in listOfGames" :key="game.gameId">
      <h2>{{ game.gameId}}</h2>
    </div>

    <!-- <select v-model="nrOfBots">
      <option value="" disabled selected>Select number of bots</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select> -->

    <Button @click="createGame">Create Game</Button>
  </div>
</template>
