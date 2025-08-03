<script setup lang="ts">
import {
  apiGetCurrentHand,
  apiGetGameById,
  apiLeaveGame,
  apiUpdateGame,
} from "@/api/useGameApi";
import { apiCreateHand, apiGetHandById, apiUpdateHand } from "@/api/useHandApi";
import { apiGetAllPlayersFromGame, apiGetPlayerById, apiUpdatePlayer } from "@/api/usePlayerApi";
import { IGame, Player } from "../interfaces/IGame";
import { IHand } from "../interfaces/IHand";
import { Hand } from "../model/Hand";
import { useGameStore } from "@/stores/gameStore";
import { usePlayerStore } from "@/stores/playerStore";
import { useSocketStore } from "@/stores/socketStore";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import PlayerHand from "@/components/PlayerHand.vue";
import { ICard } from "@/interfaces/IDeck";

const gameStore = useGameStore();
const playerStore = usePlayerStore();
const socketStore = useSocketStore();
const router = useRouter();
const route = useRoute();

const gameId = route.params._id.toString();
onMounted(async () => {
  if (!gameId) {
    console.error("No current game found");
    return;
  }
  try {
    const game = await apiGetGameById(gameId);
    console.log("Fetched game:", game);
    gameStore.setCurrentGame(game);
    playerStore.setGame(game);
    console.log("Current game set:", gameStore.currentGame);
  } catch (error) {
    console.error("Error fetching game:", error);
  }
});


async function leaveGame() {
  try {
    await apiLeaveGame(gameId, playerStore.player._id);
    socketStore.leaveGame(gameId, playerStore.player._id);
    playerStore.leaveGame();
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
    const currentHand = await apiGetCurrentHand(gameId);
    console.log("Current Hand:", currentHand);
    router.push(`/play-hand/${currentHand._id}`);
  } else {
    alert("No ongoing hand to join.");
  }
}

async function dealCardsToPlayers(hand: Hand) {
  for (const player of hand.players) {
    const playerId = typeof player === "string" ? player : player._id;
    const cards: ICard[] = [];

    for (let i = 0; i < 7; i++) {
      const card = hand.deck.dealCard();
      if (card) {
        cards.push(card);
      }
    }

    hand.playersHands[playerId] = cards;
    console.log(`${playerId} was dealt:`, cards);
  }

  await apiUpdateHand(hand._id, hand);
}

async function startGame() {
  try {
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

    const newHandData = await apiCreateHand(gameId);
    const hand = new Hand(newHandData);
    hand.startHand();

    await dealCardsToPlayers(hand);

    await apiUpdateHand(hand._id, hand);

    const updates: Partial<IGame> = {
      gameState: "in-progress",
      currentHand: hand,
    };

    await apiUpdateGame(gameId, updates);

    gameStore.setCurrentGame({
      ...gameStore.currentGame,
      gameState: "in-progress",
      currentHand: hand,
    });

    socketStore.startHand(gameId);

    router.push(`/play-hand/${hand._id}`);
  } catch (error) {
    console.error("Failed to start game:", error);
    alert("Failed to start the game. Please try again.");
  }
}

if (socketStore.socket) {
  socketStore.socket.on("handStarted", async ({ _id }) => {
    console.log("Hand started with ID:", _id);
    if (!gameStore.currentGame) {
      console.error("No current game found");
      return;
    }
    setTimeout(() => {
      router.push(`/play-hand/${_id}`);
    }, 500);
  });
}
</script>

<template>
  <div class="gameSetupContainer">
    <div class="_id">
      <h1>Game Id {{ gameId }}</h1>
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

._id {
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
