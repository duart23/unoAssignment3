<script setup lang="ts">
import PlayerHand from "@/components/PlayerHand.vue";
import UnoCard from "@/components/UnoCard.vue";
import { useGameStore } from "@/stores/gameStore";
import { computed } from "vue";

const gameStore = useGameStore();

if (!gameStore.game?.currentHand) {
  throw new Error("Game not found. Please start a game first.");
}

const currentHand = gameStore.game?.currentHand;
const topCard = currentHand.discardPile[currentHand.discardPile.length - 1];

  function drawCard() {
    const player = gameStore.game?.players[currentHand.currentPlayerIndex];
    if (!player) return;
    currentHand.drawCard(player);
    gameStore.game?.currentHand?.nextPlayer();
  }


if(gameStore.game?.players[currentHand.currentPlayerIndex].isBot) {
  
}
</script>

<template>
  <PlayerHand
    v-for="(player, index) in gameStore.game?.players"
    :key="index"
    :cards="player.playerHand"
    :name="player.name"
  />

  <div class="gameState">
    <div class="currentPlayer">Current Player: {{ gameStore.game?.players[currentHand.currentPlayerIndex].name }}</div>
    <div class="discardPile">
      <UnoCard v-if="topCard" :card="topCard"/>
    </div>
    <img
      v-if="currentHand.deck.cards.length > 0"
      src="@/assets/uno-back.png"
      alt="Draw Pile"
      class="drawPileImage"
    />
    <div class="gameActions">
      <button  @click="drawCard">
        Draw Card
      </button>
      <button>Say Uno</button>

    </div>
  </div>
</template>

<style scoped>

.drawPile {
  padding: 0;
}

.drawPileImage {
  width: 100px;
  height: 150px;
}
</style>
