<script setup lang="ts">
import { usePlayerStore } from "@/stores/playerStore";
import { ref } from "vue";
import { apiLoginPlayer } from "@/api/usePlayerApi";
import { useRouter } from "vue-router";
import { useSocketStore } from "@/stores/socketStore";
import { useGameStore } from "@/stores/gameStore";


const name = ref("");
const password = ref("");
const error = ref("");

const router = useRouter();
const socketStore = useSocketStore();
const playerStore = usePlayerStore();
const gameStore = useGameStore();

async function handleLogin() {
  const player = await apiLoginPlayer(name.value, password.value);
  if (!player) return;

  playerStore.setPlayer(player);
  socketStore.connect(player._id);
  gameStore.reset();

  router.push("/game-menu");``
}
</script>

<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <h2>Login</h2>
      <div class="form-group">
        <label for="name">Name:</label>
        <input v-model="name" type="text" id="name" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
    <div>
      <p>
        Don't have an account?
        <router-link to="/register">Register here</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.login-form {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.25rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 0.5rem;
  background: #42b983;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.error {
  color: red;
  margin-top: 1rem;
  text-align: center;
}

h2,
label {
  color: black;
}
</style>
