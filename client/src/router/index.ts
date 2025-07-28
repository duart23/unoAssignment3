import { createRouter, createWebHistory } from 'vue-router';
import GameSetup from '@/pages/GameMenu.vue';
import Game from '@/pages/Game.vue';
import PlayHand from '@/pages/PlayHand.vue';
import GameOver from '@/pages/GameOver.vue';
import Login from '@/pages/Login.vue';
import GameMenu from '@/pages/GameMenu.vue';

const routes = [
  { path: '/game-menu', component: GameMenu },
  { path: '/game', component: Game },
  { path: '/play-hand', component: PlayHand },
  { path: '/game-over', component: GameOver },
  { path: '/login', component: Login }
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
