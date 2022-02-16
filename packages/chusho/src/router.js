import { createRouter, createWebHistory } from 'vue-router';
import startCase from 'lodash/startCase';

import Playground from './components/Playground.vue';
import Examples from './components/Examples.vue';

const examplesComponents = import.meta.glob('./components/examples/**/*.vue');
const examples = [];

for (const path in examplesComponents) {
  const shortPath = path.replace('./components/examples/', '');
  const [type, item, variant] = shortPath.split('/');
  const name = startCase(variant.replace('.vue', ''));

  examples.push({
    path: `${type}/${item}/${name}`.toLowerCase().replaceAll(' ', '-'),
    component: examplesComponents[path],
    meta: {
      category: { id: type, label: startCase(type) },
      group: { id: item, label: startCase(item) },
      label: startCase(name),
    },
  });
}

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
