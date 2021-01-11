import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '@/components/HelloWorld';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HelloWorld,
      props: {
        msg: 'Hello Vue 3.0 + Vite!',
      },
    },
  ],
});
