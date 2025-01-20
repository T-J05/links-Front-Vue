import { createRouter, createWebHistory } from 'vue-router';
import { homeRoutes } from '../modules/home';
import { CreateLinkRoutes } from '../modules/CreateLink';

const routes = [
  ...homeRoutes,   // Rutas del módulo "Home"
  ...CreateLinkRoutes,  // Rutas del módulo "About"
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
