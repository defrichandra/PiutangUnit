// Composables
import { createRouter, createWebHistory } from 'vue-router'
import paths from "./paths";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: paths,
})

export default router
