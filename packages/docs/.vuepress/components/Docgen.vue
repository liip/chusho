<template>
  <CTabs class="mt-4">
    <CTabList>
      <CTab :target="doc.displayName" v-for="(doc, i) in docs">
        {{ doc.displayName }}
      </CTab>
    </CTabList>

    <CTabPanels>
      <CTabPanel :id="doc.displayName" v-for="(doc, i) in docs">
        <PropsTable
          :sections="[
            {
              label: 'Props',
              type: 'props',
              rows: doc.props,
            },
            {
              label: 'Events',
              type: 'events',
              rows: doc.events,
            },
            {
              label: 'Slots',
              type: 'slots',
              rows: doc.slots,
            },
          ]"
        />
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
