<script setup lang="ts">
import { apiGetHandById } from "@/api/useHandApi";
import PlayerHand from "@/components/PlayerHand.vue";
import UnoCard from "@/components/UnoCard.vue";
import { ICard, Type, Color } from "@/interfaces/IDeck";
import { Hand } from "@/model/Hand";
import { router } from "@/router";
import { useGameStore } from "@/stores/gameStore";
import { usePlayerStore } from "@/stores/playerStore";
import { resourceUsage } from "process";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const gameStore = useGameStore();
const playerStore = usePlayerStore();

const route = useRoute();
const handId = route.params._id.toString();

onMounted(async () => {
  if (!gameStore.currentGame) {
    console.error("No current game found");
    return;
  }
  if (!handId) {
    console.error("No current hand found");
    return;
  }
  const hand = await apiGetHandById(handId);
  if (!hand) {
    console.error("Hand not found");
    return;
  }
  gameStore.currentGame.currentHand = new Hand(hand);
});



const openPickColor = ref(false);
const cardToPickColor = ref<ICard | null>(null);
const waitingForColor = ref(false);

function drawCard() {
  if (!gameStore.currentGame?.currentHand) return;

  const player = gameStore.players[gameStore.currentGame.currentHand.currentPlayerIndex];
  if (!player || player.isBot) return;
  gameStore.currentGame.currentHand.drawCard(player);
  gameStore.currentGame.currentHand.nextPlayer();
}

function chooseColor(card: ICard | null, color: Color) {
  if (!gameStore.currentGame?.currentHand) return;
  if (!card) return;
  console.log(card.type);
  gameStore.currentGame.currentHand.applyCardEffect(card, color);
  openPickColor.value = false;
  cardToPickColor.value = null;
  waitingForColor.value = false;
  gameStore.currentGame.currentHand.nextPlayer();
}

function playCard(card: ICard) {
  if (!gameStore.currentGame?.currentHand) return;
  const player = gameStore.players[gameStore.currentGame.currentHand.currentPlayerIndex];
  if (!player) return;

  if (!player.playerHand?.includes(card)) {
    console.error("Card not found in player's hand:", card);
    return;
  }

  if (waitingForColor.value) {
    console.warn("Must pick a color before continuing.");
    return;
  }

  const isValidMove = gameStore.currentGame.currentHand.playCard(card, player);

  if (!isValidMove) {
    console.error("Invalid move attempted with card:", card);
    return;
  } else {
    if (card.type === Type.WILD || card.type === Type.WILD_DRAW_FOUR) {
      cardToPickColor.value = card;
      openPickColor.value = true;
      waitingForColor.value = true;
    } else {
      gameStore.currentGame.currentHand.applyCardEffect(card);
      gameStore.currentGame.currentHand.nextPlayer();
    }

    if (player.playerHand.length === 0) {
      // gameStore.endGame(player);

      if (gameStore.winner) {
        console.log("Game Over! Winner:", gameStore.winner.name);
        router.push("/game-over");
        return;
      }
      router.push("/game");
    }
  }
}

function getPositionClass(index: number): string {
  const total = gameStore.players.length;
  if (total === 2) {
    return index === 0 ? "bottom" : "top";
  }
  if (total === 3) {
    return ["bottom", "left", "top"][index];
  }
  if (total === 4) {
    return ["bottom", "left", "top", "right"][index];
  }
  return "";
}
</script>

<template>
  <div v-if="gameStore.currentGame?.currentHand">
    <PlayerHand
      v-for="(player, index) in gameStore.currentGame.currentHand.players"
      :key="index"
      :cards="player.playerHand"
      :player="player"
      :disabled="waitingForColor"
      :class="[getPositionClass(index), { 'non-clickable':  player.isBot}]"
      @playCard="playCard"
    />

    <div class="gameState">
      <div class="gameCenter">
        <div class="discardPile">
          <UnoCard
            v-if="gameStore.currentGame?.currentHand?.discardPile[gameStore.currentGame.currentHand.discardPile.length - 1]"
            :card="gameStore.currentGame?.currentHand?.discardPile[gameStore.currentGame.currentHand.discardPile.length - 1]"
          />
        </div>
        <img
          v-if="gameStore.currentGame?.currentHand?.deck.cards.length > 0"
          src="@/assets/uno-back.png"
          alt="Draw Pile"
          class="drawPileImage"
        />
      </div>
      <div class="currentPlayer">
        Current Player:
        {{ gameStore.players[gameStore.currentGame.currentHand.currentPlayerIndex].name }}
      </div>
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
  </div>
</template>

<style scoped>
.bottom {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.top {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.left {
  position: absolute;
  display: flex;
  justify-content: flex-start;
  top: 50%;
  width: 40%;
  left: 10px;
  transform: translateY(-50%);
}

.right {
  position: absolute;
  display: flex;
  justify-content: flex-end;
  top: 50%;
  width: 40%;
  right: 10px;
  transform: translateY(-50%);
}

.gameState {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.gameCenter {
  display: flex;
  gap: 1rem;
}
.drawPile {
  padding: 0;
}

.drawPileImage {
  width: 100px;
  height: 150px;
}

.non-clickable {
  pointer-events: none;
  cursor: not-allowed;
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
