<script setup lang="ts">
import {
  apiGetCurrentHand,
  apiGetGameById,
  apiLeaveGame,
  apiUpdateGame,
} from "@/api/useGameApi";
import { apiCreateHand, apiGetHandById, apiUpdateHand } from "@/api/useHandApi";
import { IGame } from "@/interfaces/IGame";
import { Hand } from "@/model/Hand";
import { useGameStore } from "@/stores/gameStore";
import { usePlayerStore } from "@/stores/playerStore";
import { useSocketStore } from "@/stores/socketStore";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const gameStore = useGameStore();
const playerStore = usePlayerStore();
const socketStore = useSocketStore();
const router = useRouter();
const route = useRoute();

const gameId = route.params.gameId.toString();

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

async function leaveGame() {
  try {
    await apiLeaveGame(playerStore.player.playerId, gameId);
    socketStore.leaveGame(gameId, playerStore.player.playerId);
    playerStore.setPlayer({ ...playerStore.player, gameId: "none" });
    router.push("/game-menu");
  } catch (error) {
    console.error("Error leaving game:", error);
    alert("An error occurred while leaving the game.");
  }
}

async function joinOnGoingHand() {
  if (!gameStore.currentGame) {
    throw new Error("No current game found");
  }
  if (
    gameStore.currentGame.gameState === "in-progress" &&
    gameStore.currentGame.currentHand
  ) {
    const currentHand = await apiGetCurrentHand(gameStore.currentGame.gameId);
    console.log("Current Hand:", currentHand);
    router.push(`/play-hand/${currentHand._id}`);
  } else {
    alert("No ongoing hand to join.");
  }
}

async function startGame() {
  const game = await apiGetGameById(gameId);
  if (game.gameState === "in-progress") {
    alert("Game is already in progress.");
    return;
  }

  if (!gameStore.currentGame) {
    throw new Error("No current game found");
  }

  if (gameStore.players.length < 2) {
    throw new Error("At least two players are required to start the game.");
  }

  const newHand = await apiCreateHand(gameStore.currentGame.gameId);

  const hand = new Hand(newHand);
  hand.startHand();
  await apiUpdateHand(hand._id, hand);

  const updates: Partial<IGame> = {
    gameState: "in-progress" as IGame["gameState"],
    currentHand: hand,
  };

  await apiUpdateGame(gameId, updates);
  gameStore.setCurrentGame({
    ...gameStore.currentGame,
    gameState: "in-progress",
    currentHand: newHand,
  });

  socketStore.startHand(gameId);

  setTimeout(() => {
    router.push(`/play-hand/${newHand._id}`);
  }, 500);
}

if (socketStore.socket) {
  socketStore.socket.on("handStarted", async ({ handId }) => {
    console.log("Hand started with ID:", handId);

    if(!gameStore.currentGame) {
      console.error("No current game found");
      return;
    }
    const currentHand = await apiGetCurrentHand(gameId);
    gameStore.currentGame.currentHand = new Hand(currentHand);


    setTimeout(() => {
      router.push(`/play-hand/${handId}`);
    }, 500);
  });
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
        <Button
          v-if="gameStore.currentGame?.gameState === 'waiting'"
          @click="startGame"
          >Start Game</Button
        >
        <Button
          v-if="gameStore.currentGame?.gameState === 'in-progress'"
          @click="joinOnGoingHand"
          >Join Ongoing Hand</Button
        >
      </div>
      <div class="leaveGameButton">
        <Button @click="leaveGame">Leave Game</Button>
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

th,
td {
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
}
</style>
