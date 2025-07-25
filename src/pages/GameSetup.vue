<script setup lang="ts">
import { ref } from "vue";
import { useGameStore } from "@/stores/gameStore";
import { useRouter } from "vue-router";
import type { IGame, Player } from "@/interfaces/IGame";
import { Bot } from "@/model/Bot";
import { Color } from "@/interfaces/IDeck";

const gameStore = useGameStore();
const router = useRouter();

const playerName = ref("");

const nrOfBots = ref(1);

function createPlayer(name: string, game: IGame) {
  const player: Player = {
    name,
    playerHand: [],
    score: 0,
    hasCalledUno: false,
    isBot: false,
    game: game,
  };
  gameStore.players.push(player);
}

function createBots(nrOfBots: number, game: IGame) {
  for (let i = 0; i < nrOfBots; i++) {
    const botName = `Bot ${i + 1}`;
    const bot = new Bot(botName, game);
    gameStore.players.push(bot);
  }
}


function createGame() {
  gameStore.createGame(gameStore.players);
  if(gameStore.game) {
  createPlayer(playerName.value, gameStore.game);
  createBots(nrOfBots.value, gameStore.game);
  router.push("/game");}
  else {
    alert("Failed to create game. Please try again.");
  }
}
</script>

<template>
  <div>
    <h1>Welcome to UNO!</h1>
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
