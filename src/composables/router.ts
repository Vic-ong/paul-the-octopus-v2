import { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import NewCharacter from '@/views/NewCharacter.vue';
import Compatibility from '@/views/Compatibility.vue';
import DataView from '@/views/DataView.vue';

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'new-character',
    path: '/new-character',
    component: NewCharacter,
  },
  {
    name: 'compatibility',
    path: '/compatibility',
    component: Compatibility,
  },
  {
    name: 'data',
    path: '/data',
    component: DataView,
  },
  {
    name: 'unkown-route',
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'home',
    },
  },
];

export const registerRouter = (app: App): void => {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  app.use(router);
};
