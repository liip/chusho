<template>
  <ComponentSpecs v-if="docs.length === 1" :doc="docs[0]" class="mt-4" />
  <CTabs v-else class="mt-4">
    <CTabList>
      <CTab :target="doc.displayName" v-for="(doc, i) in docs">
        {{ doc.displayName }}
      </CTab>
    </CTabList>

    <CTabPanels>
      <CTabPanel :id="doc.displayName" v-for="(doc, i) in docs">
        <ComponentSpecs :doc="doc" />
      </CTabPanel>
    </CTabPanels>
  </CTabs>
</template>

<script>
import { defineComponent } from 'vue';
import { usePageData } from '@vuepress/client';

export default defineComponent({
  name: 'Docgen',

  props: {
    components: {
      type: Array,
      required: true,
    },
  },

  setup() {
    const page = usePageData();

    return {
      page,
    };
  },

  computed: {
    docs() {
      const docs = [];
      this.components.forEach((cmp) => {
        const data = this.page?.componentsDocgen?.[cmp];
        if (data && (data.props || data.events || data.slots)) docs.push(data);
      });
      return docs;
    },
  },
});
</script>
