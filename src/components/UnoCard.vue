<script lang="ts" setup>
import type { ICard } from "@/interfaces/IDeck";
import { Type } from "@/interfaces/IDeck";
import { defineProps, defineEmits } from "vue";
const props = defineProps<{
  card: ICard;
}>();
const emit = defineEmits<{
  (e: "play", card: ICard): void;
}>();

function handleClick() {
  emit("play", props.card);
}
</script>

<template>
  <div class="unoCard" :class="card.color.toLowerCase()" @click="handleClick">
    <div class="card">
      <div v-if="card.type === Type.WILD">
        <img src="@/assets/WildCard.jpg" alt="wild" class="wildCard" />
      </div>
      <div v-if="card.type === Type.NUMBER" class="cardValue">
        {{ card.value }}
      </div>
      <div v-if="card.type === Type.SKIP" class="cardValue">⦸</div>
      <div v-if="card.type === Type.REVERSE" class="cardValue">↻</div>
      <div v-if="card.type === Type.DRAW_TWO" class="cardValue">
        +2
      </div>
      <div v-if="card.type === Type.WILD_DRAW_FOUR" class="cardValue">+4
      </div>
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

.cardValue {
  font-size: 24px;
  border-radius: 50%;
  background-color: white;
  color: black;
  padding: 16px;
}

.wildCard {
  width: 100%;
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

.uno-card.black {
  background-color: #000000;
}
</style>
