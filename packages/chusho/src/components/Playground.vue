<template>
  <div class="h-screen flex flex-col">
    <header
      class="z-10 py-4 px-5 text-white bg-gray-700 border-b border-gray-800 shadow-md"
    >
      <h1 class="font-bold text-lg">Chūshō playground</h1>
    </header>

    <div class="flex flex-grow overflow-hidden">
      <div
        class="w-1/6 bg-gray-50 border-r border-gray-200 overflow-y-auto space-y-6"
      >
        <div v-for="category in categories" :key="category.id" class="my-4">
          <div class="mb-2 px-5 font-bold">{{ category.label }}</div>
          <ul>
            <li v-for="group in category.groups" :key="group.id">
              <CCollapse v-model="group.open">
                <CCollapseBtn
                  class="flex items-center w-full text-left py-2 px-2 font-medium text-sm hover:bg-gray-100"
                  bare
                >
                  <CIcon
                    id="caret"
                    :scale="0.333"
                    class="mr-1 text-gray-400 transition origin-center"
                    :class="{ 'rotate-[-90deg]': !group.open }"
                  />
                  {{ group.label }}
                </CCollapseBtn>
                <CCollapseContent
                  :transition="false"
                  bare
                  class="mb-2 bg-gray-100"
                >
                  <ul>
                    <li v-for="variant in group.variants" :key="variant.to">
                      <a
                        :href="variant.to"
                        class="block py-2 px-6 text-gray-500 text-sm hover:bg-gray-200 border-l-4"
                        :class="{
                          'font-medium border-accent-500 text-accent-600':
                            variant.to === $route.query.preview,
                          'border-l-transparent':
                            variant.to !== $route.query.preview,
                        }"
                        @click.prevent="updatePreview(variant.to)"
                      >
                        {{ variant.label }}
                      </a>
                    </li>
                  </ul>
                </CCollapseContent>
              </CCollapse>
            </li>
          </ul>
        </div>
      </div>

      <div class="flex flex-col w-5/6 shadow-xl">
        <div class="flex-1">
          <iframe
            ref="iframe"
            :src="previewSrc"
            frameborder="0"
            class="h-full w-full"
            @load="iframeLoaded"
          />
        </div>
        <div
          class="code flex-1 bg-white border-t border-gray-200 overflow-y-auto"
        >
          <!-- eslint-disable vue/no-v-html -->
          <pre
            class="h-full p-5"
          ><code language="hljs xml" v-html="code"></code></pre>
          <!-- eslint-enable vue/no-v-html -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import 'highlight.js/styles/atom-one-light.css';

import router from '@/router';

function buildCategories() {
  const examples = router
    .getRoutes()
    .find((route) => route.name === 'examples');

  const categories = {};

  examples.children.forEach((example) => {
    let category = categories[example.meta.category.id];

    if (!category) {
      category = categories[example.meta.category.id] = {
        ...example.meta.category,
        groups: {},
      };
    }

    let group = category.groups[example.meta.group.id];

    if (!group) {
      group = category.groups[example.meta.group.id] = {
        ...example.meta.group,
        variants: [],
      };
    }

    const variant = {
      label: example.meta.label,
      to: `/examples/${example.path}`,
    };

    if (variant.to === router.currentRoute.value.query.preview && !group.open) {
      group.open = true;
    }

    group.variants.push(variant);
  });

  return categories;
}

export default defineComponent({
  setup() {
    return {
      iframe: ref(null),
    };
  },

  data() {
    return {
      previewSrc:
        this.$route.query.preview || '/examples/components/alert/default',
      previewNode: null,
      code: '',
      observer: null,
      highlightWorker: null,
      categories: buildCategories(),
    };
  },

  mounted() {
    this.observer = new MutationObserver(this.updateCode);
    this.highlightWorker = new Worker('/highlightWorker.js');

    this.highlightWorker.addEventListener('message', (e) => {
      this.code = e.data;
    });

    if (!this.$route.query.preview) {
      this.updatePreview('/examples/components/alert/default');
    }
  },

  methods: {
    iframeLoaded() {
      this.previewNode =
        this.$refs.iframe.contentDocument.querySelector('#app');
      this.observer.observe(this.previewNode, {
        childList: true,
        subtree: true,
      });
      this.updateCode();
    },

    updatePreview(to) {
      this.$router.replace({
        query: {
          preview: to,
        },
      });

      if (this.iframe?.contentWindow) {
        this.iframe.contentWindow.postMessage(
          JSON.stringify({ type: 'changePreview', to: to }),
          window.location
        );
      }
    },

    updateCode() {
      this.highlightWorker.postMessage(this.previewNode.innerHTML);
    },
  },
});
</script>
