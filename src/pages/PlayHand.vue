<script setup lang="ts">
import PlayerHand from "@/components/PlayerHand.vue";
import UnoCard from "@/components/UnoCard.vue";
import { ICard, Type, Color } from "@/interfaces/IDeck";
import { router } from "@/router";
import { useGameStore } from "@/stores/gameStore";
import { ref, watch } from "vue";

const gameStore = useGameStore();

if (!gameStore.game?.currentHand) {
  throw new Error("Game not found. Please start a game first.");
}

const currentHand = gameStore.game?.currentHand;

const openPickColor = ref(false);
const cardToPickColor = ref<ICard | null>(null);
const waitingForColor = ref(false);

watch(
  () => gameStore.game?.currentHand?.currentPlayerIndex,
  () => {
    gameStore.checkBotTurn();
  }
);

function drawCard() {
  const player = gameStore.players[currentHand.currentPlayerIndex];
  if (!player) return;
  currentHand.drawCard(player);
  gameStore.game?.currentHand?.nextPlayer();
}

function chooseColor(card: ICard | null, color: Color) {
  if (!card) return;
  console.log(card.type)
  currentHand.applyCardEffect(card, color);
  openPickColor.value = false;
  cardToPickColor.value = null;
  waitingForColor.value = false;
  currentHand?.nextPlayer();
}

function playCard(card: ICard) {
  const player = gameStore.players[currentHand.currentPlayerIndex];
  if (!player) return;

  if (!player.playerHand?.includes(card)) {
    console.error("Card not found in player's hand:", card);
    return;
  }

  if (waitingForColor.value) {
    console.warn("Must pick a color before continuing.");
    return;
  }

  const isValidMove = currentHand.playCard(card, player);

  if (!isValidMove) {
    console.error("Invalid move attempted with card:", card);
    return;
  } else {


    if (card.type === Type.WILD || card.type === Type.WILD_DRAW_FOUR) {
      cardToPickColor.value = card;
      openPickColor.value = true;
      waitingForColor.value = true;
    } else {
      currentHand.applyCardEffect(card);
      currentHand?.nextPlayer();
    }

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
}



</script>

<template>
  <PlayerHand
    v-for="(player, index) in gameStore.players"
    :key="index"
    :cards="player.playerHand"
    :name="player.name"
    :disabled="waitingForColor"
    @playCard="playCard"
  />

  <div class="gameState">
    <div class="currentPlayer">
      Current Player:
      {{ gameStore.players[currentHand.currentPlayerIndex].name }}
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
      <button @click="drawCard" :disabled="waitingForColor">Draw Card</button>
      <button>Say Uno</button>
    </div>

    <div class="modal" v-if="openPickColor">
      <button
        v-for="color in Object.values(Color).filter((c) => c !== Color.BLACK)"
        :key="color"
        @click="chooseColor(cardToPickColor, color)"
        :disabled="!cardToPickColor"
      >
        {{ color }}
      </button>
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
