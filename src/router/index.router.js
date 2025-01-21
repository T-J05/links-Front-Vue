import { createRouter, createWebHistory } from 'vue-router';
import { homeRoutes } from '../modules/home';
import { CreateLinkRoutes } from '../modules/CreateLink';
import {FilterLinkRoutes} from '../modules/FilterLink';
import { DetailsRoutes } from '../modules/Details';

const routes = [
  ...homeRoutes,   // Rutas del módulo "Home"
  ...CreateLinkRoutes,  // Rutas del módulo "About"
  ...FilterLinkRoutes,
  ...DetailsRoutes
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
