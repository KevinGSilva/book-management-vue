import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import authMiddleware from '@/middlewares/authMiddleware.js';
import adminMiddleware from '@/middlewares/adminMiddleware.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
      beforeEnter: (to, from, next) => {
        authMiddleware({ to, next }, () => {
          adminMiddleware({ to, next });
        });
      },
      children: [
        
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Auth/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Auth/RegisterView.vue'),
    }
  ],
})

export default router
