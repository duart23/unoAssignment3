<script setup  lang="ts">
import { useGameStore } from "@/stores/gameStore";

const gameStore = useGameStore();



</script>


<template>
  <div>
    <h1>Hand is playing</h1>
    <p>Here you can play your hand.</p>
    <p>{{ gameStore.game?.gameId}}</p>
    <p>Current: {{ gameStore.game?.currentHand?.currentPlayerIndex}}</p>
  </div>
</template>
