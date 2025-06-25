<script setup lang="ts">
import PlayerHand from "@/components/PlayerHand.vue";
import UnoCard from "@/components/UnoCard.vue";
import { ICard, Type, Color } from "@/interfaces/IDeck";
import { router } from "@/router";
import { useGameStore } from "@/stores/gameStore";
import { computed, watchEffect } from "vue";

const gameStore = useGameStore();

if (!gameStore.game?.currentHand) {
  throw new Error("Game not found. Please start a game first.");
}

const currentHand = gameStore.game?.currentHand;

function drawCard() {
  const player = gameStore.game?.players[currentHand.currentPlayerIndex];
  if (!player) return;
  currentHand.drawCard(player);
  gameStore.game?.currentHand?.nextPlayer();
}

function applyCardEffect(card: ICard) {
  if (!card) return;

  const chosenColor = Color.RED;
  if (card.type === Type.WILD || card.type === Type.WILD_DRAW_FOUR) {
    currentHand.applyCardEffect(card, chosenColor);
  } else currentHand.applyCardEffect(card);
}

function playCard(card: ICard) {
  const player = gameStore.game?.players[currentHand.currentPlayerIndex];
  if (!player) return;

  if (!player.playerHand?.includes(card)) {
    console.error("Card not found in player's hand:", card);
    return;
  }

  const isValidMove = currentHand.playCard(card, player);

  if (!isValidMove) {
    console.error("Invalid move attempted with card:", card);
    return;
  } else {
    console.log("Card played:", card);
    applyCardEffect(card);
    if (player.playerHand.length === 0) {
      gameStore.endGame(player);
      router.push("/game");
    }
    currentHand?.nextPlayer();
  }
}

const player = gameStore.game?.players[currentHand.currentPlayerIndex];
if (player?.isBot) {
  console.log("Bot is taking turn");
  currentHand.botTakeTurn();
}

watchEffect(() => {
  const player = gameStore.game?.players[currentHand.currentPlayerIndex];
  if (player?.isBot) {
    currentHand.botTakeTurn();
  }
});
</script>

<template>
  <PlayerHand
    v-for="(player, index) in gameStore.game?.players"
    :key="index"
    :cards="player.playerHand"
    :name="player.name"
    @playCard="playCard"
  />

  <div class="gameState">
    <div class="currentPlayer">
      Current Player:
      {{ gameStore.game?.players[currentHand.currentPlayerIndex].name }}
    </div>
    <div class="discardPile">
      <UnoCard
        v-if="currentHand?.discardPile[currentHand.discardPile.length - 1]"
        :card="currentHand?.discardPile[currentHand.discardPile.length - 1]"
      />
    </div>
    <img
      v-if="currentHand.deck.cards.length > 0"
      src="@/assets/uno-back.png"
      alt="Draw Pile"
      class="drawPileImage"
    />
    <div class="gameActions">
      <button @click="drawCard">Draw Card</button>
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
