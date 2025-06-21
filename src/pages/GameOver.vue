<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

function goToHome() {
  router.push("/");
}
</script>

<template>
  <h1>The game is over!</h1>
  <h2>"PLAYER" IS THE WINNER</h2>

  <button @click="goToHome">Play Again</button>
</template>
