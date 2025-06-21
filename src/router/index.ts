import { createRouter, createWebHistory } from 'vue-router';
import GameSetup from '@/pages/GameSetup.vue';
import Game from '@/pages/Game.vue';
import PlayHand from '@/pages/PlayHand.vue';
import GameOver from '@/pages/GameOver.vue';

const routes = [
  { path: '/', component: GameSetup },
  { path: '/game', component: Game },
  { path: '/play-hand', component: PlayHand },
  { path: '/game-over', component: GameOver },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
