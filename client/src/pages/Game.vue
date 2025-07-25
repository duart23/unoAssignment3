<script setup lang="ts">
import { useGameStore } from "@/stores/gameStore";
import { useRouter } from "vue-router";

const gameStore = useGameStore();
const router = useRouter();

function startGame() {

  if (!gameStore.game) {
    return;
  }
  if (gameStore.players.length < 2) {
    alert("At least two players are required to start the game.");
    return;
  }
  gameStore.startGame(gameStore.players, gameStore.game?.gameId);

  setTimeout(() => {
    router.push("/play-hand");
  }, 500);
  
}
</script>

<template>
  <div class="gameSetupContainer">
    <div class="gameId">
      <h1>Game Id {{ gameStore.game?.gameId }}</h1>
    </div>
    <div class="gameSetup">
      <div>
        <h2>Scoreboard</h2>
        <div class="scoreboard">
          <table>
            <thead>
              <tr>
                <th>Player</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="player in gameStore.game?.players" :key="player.name">
                <td>{{ player.name }}</td>
                <td>{{ player.score }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="gameSetupButton">
        <Button @click="startGame">Start Game</Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gameSetupContainer {
  width: auto;
  margin: 0 2rem;
  overflow-x: hidden;
}

.gameId {
  display: flex;
  justify-content: center;
}

.gameSetup {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 4rem;
  font-size: x-large;
}

.gameSetupButton {
  display: flex;
  align-items: center;
  justify-content: center;
}


table {
  margin: 0 auto;
  border-collapse: collapse;
  width: 60%;
}

th, td {
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
}


</style>
