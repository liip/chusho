import { createRouter, createWebHistory } from 'vue-router';

import Playground from './components/Playground.vue';
import Examples from './components/Examples.vue';

import examplesRoutes from './components/examples/routes.json';

const examples = Object.keys(examplesRoutes).flatMap((categoryKey) => {
  const category = examplesRoutes[categoryKey];

  return Object.keys(category.items).flatMap((groupKey) => {
    const group = category.items[groupKey];

    return group.variants.map(({ label, component }) => ({
      path: `${categoryKey}/${groupKey}/${label}`
        .toLowerCase()
        .replaceAll(' ', '-'),
      component: () =>
        import(
          `./components/examples/${categoryKey}/${groupKey}/${component}.vue`
        ),
      meta: {
        category: { id: categoryKey, label: category.label },
        group: { id: groupKey, label: group.label },
        label,
      },
    }));
  });
});

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'playground',
      component: Playground,
    },
    {
      path: '/examples',
      name: 'examples',
      component: Examples,
      children: examples,
    },
  ],
});

export default router;
