<template>
  <div class="mt-4">
    <div v-for="(doc, i) in docs" :key="i" :id="doc.displayName">
      <h3>{{ doc.displayName }}</h3>
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
    </div>
  </div>
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
