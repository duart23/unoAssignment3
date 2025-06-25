<script lang="ts" setup>
import UnoCard from "./UnoCard.vue";
import { ICard } from "@/interfaces/IDeck";

const { cards, name } = defineProps<{
  cards: ICard[] | undefined;
  name: string;
}>();

const emit = defineEmits<{
  (e: 'playCard', card: ICard): void;
}>();

function handlePlay(card: ICard) {
  emit('playCard', card);
}
</script>

<template>
    <h2>{{ name }}</h2>
  <div class="playerHand">
    <UnoCard
      v-for="(card, i) in cards"
      :key="i"
      :card="card"
      @play="handlePlay"
      
    ></UnoCard>
  </div>
</template>

<style scoped>
.playerHand {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
}
</style>