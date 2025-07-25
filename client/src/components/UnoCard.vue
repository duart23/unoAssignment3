<script lang="ts" setup>
import type { ICard } from "@/interfaces/IDeck";
import { Type } from "@/interfaces/IDeck";
import { Player } from "@/interfaces/IGame";
import { defineProps, defineEmits } from "vue";
const props = defineProps<{
  card: ICard;
  player?: Player;
}>();
const emit = defineEmits<{
  (e: "play", card: ICard): void;
}>();

function handleClick() {
  emit("play", props.card);
}
</script>

<template>
  <div v-if="player?.isBot" class="backCard">
    <img src="@/assets/uno-back.png" alt="Back of Card" />
  </div>
  <div
    class="unoCard"
    :class="card.color.toLowerCase()"
    @click="handleClick"
    v-else
  > 
    <div v-if="card.type === Type.WILD" class="cardValue">W</div>
    <div v-else-if="card.type === Type.NUMBER" class="cardValue">
      {{ card.value }}
    </div>
    <div v-else-if="card.type === Type.SKIP" class="cardValue">⦸</div>
    <div v-else-if="card.type === Type.REVERSE" class="cardValue">↻</div>
    <div v-else-if="card.type === Type.DRAW_TWO" class="cardValue">+2</div>
    <div v-else-if="card.type === Type.WILD_DRAW_FOUR" class="cardValue">
      +4
    </div>
  </div>
</template>

<style scoped>
.unoCard {
  width: 100px;
  height: 150px;
  border-radius: 10px;
  border: white 4px solid;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.backCard {
  width: 110px;
  height: 160px;
}

.backCard img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.cardValue {
  font-size: 24px;
  border-radius: 50%;
  background-color: white;
  color: black;
  padding: 16px;
}

.unoCard.red {
  background-color: #f11010;
}

.unoCard.blue {
  background-color: #0b52ec;
}

.unoCard.green {
  background-color: #14ca4b;
}

.unoCard.yellow {
  background-color: #eef12a;
}

.unoCard.black {
  background-color: #000000;
}
</style>
