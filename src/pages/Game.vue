<script setup  lang="ts">
import { useGameStore } from "@/stores/gameStore";

const gameStore = useGameStore();

</script>

<template>
  <div>
    <h1>Game Id {{ gameStore.game?.gameId }}</h1>
    <h1>Players: </h1>
    <ul class="player-list">
      <li v-for="(player, index) in gameStore.game?.players" :key="index">{{ player.name }}</li>
    </ul>
    <Button @click="$router.push('/play-hand')">Start Game</Button>
  </div>
</template>

<style scoped>
.player-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

</style>
