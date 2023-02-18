<template>
  <template v-if="docs.length">
    <ComponentSpecs v-if="docs.length === 1" :doc="docs[0]" />
    <CTabs v-else v-model="activeTab">
      <CTabList class="tablist">
        <CTab
          v-for="(doc, i) in docs"
          :key="i"
          :target="doc.displayName"
          class="tab"
          :class="{ active: activeTab === doc.displayName }"
        >
          {{ doc.displayName }}
        </CTab>
      </CTabList>
      <CTabPanels>
        <CTabPanel v-for="(doc, i) in docs" :id="doc.displayName" :key="i">
          <ComponentSpecs :doc="doc" />
        </CTabPanel>
      </CTabPanels>
    </CTabs>
  </template>
</template>

<script>
import componentsDocGen from 'virtual:docgen';
import { useData } from 'vitepress';
import { computed, defineComponent, ref } from 'vue';

import ComponentSpecs from './ComponentSpecs.vue';

export default defineComponent({
  name: 'Docgen',

  components: {
    ComponentSpecs,
  },

  props: {
    components: {
      type: Array,
      required: true,
    },
  },

  setup(props) {
    const { page } = useData();

    const docgen = ref(componentsDocGen);
    const docs = computed(() => {
      const docs = [];

      props.components.forEach((cmp) => {
        const data = docgen.value[cmp];
        if (data && (data.props || data.events || data.slots)) docs.push(data);
      });

      return docs;
    });

    if (import.meta.hot) {
      import.meta.hot.on('docgen-changed', (data) => {
        docgen.value = data;
      });
    }

    const activeTab = ref(docs.value[0]?.displayName);

    return {
      activeTab,
      page,
      docs,
    };
  },
});
</script>

<style scoped>
.tablist {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;

  margin-bottom: 1rem;
}

.tab {
  padding-bottom: 0.5rem;

  color: var(--vp-c-text-2);
  font-size: 1rem;
  font-weight: 600;

  border-bottom: 2px solid transparent;

  &:hover {
    color: var(--vp-c-text-1);
  }

  &.active {
    color: var(--vp-c-brand);
    border-bottom-color: currentColor;
  }
}
</style>
