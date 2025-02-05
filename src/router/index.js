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
        {
          path: '/authors', 
          name: 'authors', 
          component: () => import('../views/Authors/AuthorsListView.vue'),
        },
        {
          path: '/authors/create', 
          name: 'authors.create', 
          component: () => import('../components/authors/Form.vue'),
        },
        {
          path: '/authors/edit/:id', 
          name: 'authors.edit', 
          component: () => import('../components/authors/Form.vue'),
        },
        {
          path: '/books',
          name: 'books',
          component: () => import('../views/Books/BooksListView.vue'),
        },
        {
          path: '/books/create', 
          name: 'books.create', 
          component: () => import('../components/books/Form.vue'),
        },
        {
          path: '/books/edit/:id', 
          name: 'books.edit', 
          component: () => import('../components/books/Form.vue'),
        },
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
