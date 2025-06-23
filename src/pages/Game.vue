<script setup  lang="ts">
import { useGameStore } from "@/stores/gameStore";
import { useRouter } from "vue-router";

const gameStore = useGameStore();
const router = useRouter();

function startGame() {
  if(!gameStore.game){
    return;
  }
  if (gameStore.game?.players.length < 2) {
    alert("At least two players are required to start the game.");
    return;
  }
  gameStore.startGame(gameStore.game?.players, gameStore.game?.gameId);
  router.push('/play-hand')
}




</script>

<template>
  <div>
    <h1>Game Id {{ gameStore.game?.gameId }}</h1>
    <h1>Players: </h1>
    <ul class="player-list">
      <li v-for="(player, index) in gameStore.game?.players" :key="index">{{ player.name }}</li>
    </ul>
    <Button @click="startGame">Start Game</Button>
  </div>
</template>

<style scoped>
.player-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

</style>
