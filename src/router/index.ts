import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/trending',
      name: 'trending',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/profile/:username',
      name: "Profile",
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/posts/:post_id',
      name: "Post",
      component: () => import('../views/PostView.vue')
    }
  ]
})

export default router
