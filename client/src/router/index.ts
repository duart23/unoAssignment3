import { createRouter, createWebHistory } from 'vue-router';
import GameSetup from '@/pages/GameMenu.vue';
import Game from '@/pages/Game.vue';
import PlayHand from '@/pages/PlayHand.vue';
import GameOver from '@/pages/GameOver.vue';
import Login from '@/pages/Login.vue';
import GameMenu from '@/pages/GameMenu.vue';
import Register from '@/pages/Register.vue';

const routes = [
  { path: '/game-menu', component: GameMenu },
  {  path: '/game/:gameId', name: 'Game', component: Game },
  { path: '/play-hand/:_id', name: 'PlayHand', component: PlayHand },
  { path: '/game-over', component: GameOver },
  { path: '/login', component: Login },
  { path: '/register', component: Register }
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
