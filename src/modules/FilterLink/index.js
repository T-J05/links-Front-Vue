export const FilterLinkRoutes = [
    {
      path: '/filter/:id',
      name: 'filter',
      component: () => import('./FilterLinkView.vue'),
    },
  ];
  