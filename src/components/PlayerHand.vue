<script lang="ts" setup>
import { Player } from "@/interfaces/IGame";
import UnoCard from "./UnoCard.vue";
import { ICard } from "@/interfaces/IDeck";

const { cards, player } = defineProps<{
  cards: ICard[] | undefined;
  player: Player;
}>();

const emit = defineEmits<{
  (e: 'playCard', card: ICard): void;
}>();

function handlePlay(card: ICard) {
  emit('playCard', card);
}
</script>

<template>
  <div class="playerHand">
    <UnoCard
      v-for="(card, i) in cards"
      :key="i"
      :card="card"
      :player="player"
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