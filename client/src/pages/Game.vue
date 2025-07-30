<script setup lang="ts">
import { apiGetGameById, apiUpdateGame } from "@/api/useGameApi";
import { apiCreateHand } from "@/api/useHandApi";
import { IGame } from "@/interfaces/IGame";
import { Hand } from "@/model/Hand";
import { useGameStore } from "@/stores/gameStore";
import { usePlayerStore } from "@/stores/playerStore";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const gameStore = useGameStore();
const playerStore = usePlayerStore();
const router = useRouter();
const route = useRoute();

const gameId = route.params.gameId;


onMounted(async () => { 
  if (!gameId) {
    console.error("No current game found");
    return;
  }
  try {
    const game = await apiGetGameById(gameId as string);
    gameStore.setCurrentGame(game);
    console.log("Current game set:", gameStore.currentGame);
  } catch (error) {
    console.error("Error fetching game:", error);
  }
});

async function startGame() {
  console.log("Starting game...");

  if(!gameStore.currentGame) {
    throw new Error("No current game found");
  }

  if (gameStore.players.length < 2) {
    throw new Error("At least two players are required to start the game.");
  }
  const newHand = await apiCreateHand(gameStore.currentGame.gameId);

   gameStore.currentGame.currentHand = Hand.fromData(newHand);
    
  gameStore.startNewHand(gameStore.players);

  const updates : IGame = {
    gameState : "in-progress",
  }

  await apiUpdateGame(gameId, updates )
}

   setTimeout(() => {
     router.push(`/play-hand/${newHand._id}`);
   }, 500);
  
}
</script>

<template>
  <div class="gameSetupContainer">
    <div class="gameId">
      <h1>Game Id {{ gameStore.currentGame?.gameId }}</h1>
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
              <tr v-for="player in gameStore.players" :key="player.name">
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
