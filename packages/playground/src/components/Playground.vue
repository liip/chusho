<template>
  <div class="h-screen flex flex-col">
    <header
      class="z-10 py-4 px-5 text-white bg-gray-800 border-b border-gray-900 shadow-md"
    >
      <h1 class="font-bold text-lg">Chūshō playground</h1>
    </header>

    <div class="flex flex-grow overflow-hidden">
      <div
        class="w-1/5 bg-gray-200 border-r border-gray-300 overflow-y-auto space-y-6"
      >
        <div v-for="category in categories" :key="category.id" class="my-4">
          <div class="mb-2 px-5 font-bold">{{ category.label }}</div>
          <ul>
            <li v-for="group in category.groups" :key="group.id">
              <CCollapse :model-value="group.open">
                <CCollapseBtn
                  class="block w-full text-left py-1 px-5 font-medium text-sm hover:bg-gray-300"
                  bare
                >
                  {{ group.label }}
                </CCollapseBtn>
                <CCollapseContent :transition="false" bare>
                  <ul>
                    <li v-for="variant in group.variants" :key="variant.to">
                      <a
                        :href="variant.to"
                        class="block py-1 px-8 text-gray-600 text-sm hover:bg-gray-300"
                        :class="{
                          'bg-gray-300 font-medium text-gray-800 border-r-4 border-accent-500':
                            variant.to === $route.query.preview,
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

      <div class="flex flex-col w-4/5">
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
          class="code flex-1 bg-gray-100 border-t border-gray-300 overflow-y-auto"
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

<script lang="ts">
import { defineComponent, ref } from 'vue';

import prettier from 'prettier/esm/standalone';
import parserHtml from 'prettier/esm/parser-html';
import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/atom-one-light.css';

hljs.registerLanguage('xml', xml);

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
    };
  },

  computed: {
    categories() {
      const examples = this.$router
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

        if (variant.to === this.$route.query.preview) {
          group.open = true;
        }

        group.variants.push(variant);
      });

      return categories;
    },
  },

  mounted() {
    this.observer = new MutationObserver(this.updateCode);

    if (!this.$route.query.preview) {
      this.updatePreview('/examples/components/alert/default');
    }
  },

  methods: {
    iframeLoaded() {
      this.previewNode = this.$refs.iframe.contentDocument.querySelector(
        '#preview'
      );
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
      this.code = hljs.highlight(
        'xml',
        prettier.format(this.previewNode.innerHTML, {
          parser: 'html',
          plugins: [parserHtml],
          htmlWhitespaceSensitivity: 'ignore',
        })
      ).value;
    },
  },
});
</script>
