export const DetailsRoutes = [
    {
      path: '/details/:id',
      name: 'details',
      component: () => import('./DetailsView.vue'),
    },
  ];
  