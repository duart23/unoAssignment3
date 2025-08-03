<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useGameStore } from "@/stores/gameStore";
import { useRouter } from "vue-router";
import type { IGame, Player } from "../interfaces/IGame";
import { apiCreateGame, apiGetAllGames, apiJoinGame } from "@/api/useGameApi";
import { usePlayerStore } from "@/stores/playerStore";
import { useSocketStore } from "@/stores/socketStore";

const gameStore = useGameStore();
const socketStore = useSocketStore();
const playerStore = usePlayerStore();
const router = useRouter();

const listOfGames = ref<IGame[]>([]);
console.log(listOfGames);

async function fetchGames() {
  listOfGames.value = await apiGetAllGames();
  console.log("List of games:", listOfGames.value);
}

async function createGame() {
  try {
    await apiCreateGame();
    await fetchGames();
  } catch (error) {
    console.error("Error creating game:", error);
  }
}

async function joinGame(_id: string) {
  try {
    const response = await apiJoinGame(_id, playerStore.player._id);
    if (response) {
      socketStore.joinGame(_id, playerStore.player._id);
      router.push(`/game/${_id}`);
    } else {
      alert("Failed to join game");
    }
  } catch (error) {
    console.error("Error joining game:", error);
    alert("An error occurred while joining the game.");
  }
}

onMounted(fetchGames);

// const nrOfBots = ref(1);
// function createBots(nrOfBots: number, game: IGame) {
//   for (let i = 0; i < nrOfBots; i++) {
//     const botName = `Bot ${i + 1}`;
//     const bot = new Bot(botName, game);
//     gameStore.players.push(bot);
//   }
// }
</script>

<template>
  <h1>Welcome to UNO!</h1>
  <div class="gameMenu">
    <div class="gameList">
      <div class="gameItem" v-for="game in listOfGames" :key="game._id">
        <h2>{{ game._id }}</h2>
        <p>Players:</p>
        <ul>
          <li v-for="player in game.players" :key="player._id">
            {{ player.name }}
          </li>
        </ul>
        <p>Game State: {{ game.gameState }}</p>
        <button @click="joinGame(game._id)">Join Game</button>
      </div>
    </div>
    <!-- <select v-model="nrOfBots">
      <option value="" disabled selected>Select number of bots</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select> -->

    <div class="dashboard">
      <div class="playerInfo">
        <h2>Player Info</h2>
        <p>Name: {{ playerStore.player.name }}</p>
        <p>Player ID: {{ playerStore.player._id}}</p>
      </div>
      <button @click="fetchGames">Refresh Games</button>
      <button @click="createGame">Create Game</button>
    </div>
  </div>
</template>

<style scoped>

.gameMenu {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  padding: 2rem;;
}
.gameList {
  width:60%;
  display: grid;
  grid-template-columns: 30% 30% 30%;
  gap: 10px;
}

.gameItem {
  width:400px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  background-color: antiquewhite;
  color: black;
}

.dashboard {
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
  margin-top: 10px;
}
</style>
