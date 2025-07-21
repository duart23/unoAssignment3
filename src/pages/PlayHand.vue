<script setup lang="ts">
import PlayerHand from "@/components/PlayerHand.vue";
import UnoCard from "@/components/UnoCard.vue";
import { ICard, Type, Color } from "@/interfaces/IDeck";
import { router } from "@/router";
import { useGameStore } from "@/stores/gameStore";
import { ref, watchEffect } from "vue";

const gameStore = useGameStore();

if (!gameStore.game?.currentHand) {
  throw new Error("Game not found. Please start a game first.");
}

const currentHand = gameStore.game?.currentHand;

const openPickColor = ref(false);



function drawCard() {
  const player = gameStore.game?.players[currentHand.currentPlayerIndex];
  if (!player) return;
  currentHand.drawCard(player);
  gameStore.game?.currentHand?.nextPlayer();
}

function applyCardEffect(card: ICard) {

  if (!card) return;
  if (card.type === Type.WILD || card.type === Type.WILD_DRAW_FOUR) {
    console.log("Wild card played:", card);
    openPickColor.value = true;
    // Wait for the player to choose a color
    //NOOOOT WORKIIIINGGG

    currentHand.applyCardEffect(card, chooseColor(Color.RED));

  } else currentHand.applyCardEffect(card);
}

function chooseColor(color: Color) {
  openPickColor.value = false;
  return color;
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

      if (gameStore.winner) {
        console.log("Game Over! Winner:", gameStore.winner.name);
        router.push("/game-over");
        return;
      }
      router.push("/game");
    }
  }

  currentHand?.nextPlayer();
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

  <div v-if="openPickColor" class="modal">
    <button
      v-for="color in Object.values(Color).filter((c) => c !== Color.BLACK)"
      :key="color"
      @click="chooseColor(color)"
    >
      {{ color }}
    </button>
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

.modal {
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 30%;
  width: 500px;
  height: 100px;
  background-color: white;
  border: 2px solid black;
  border-radius: 10px;

  display: flex;
  justify-content: space-around;
  align-items: center;
}

.modal button {
  width: 80px;
  height: 40px;
  font-size: 16px;
} 

.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4); /* slightly dark + transparent */
  backdrop-filter: blur(6px); /* this applies the blur effect */
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
