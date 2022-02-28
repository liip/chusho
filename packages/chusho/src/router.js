import startCase from 'lodash/startCase';
import {
  createRouter as _createRouter,
  createMemoryHistory,
  createWebHistory,
} from 'vue-router';

import Examples from './components/Examples.vue';
import Playground from './components/Playground.vue';

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

export function createRouter() {
  return _createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
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
}
