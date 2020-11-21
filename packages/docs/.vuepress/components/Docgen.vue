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
        ]"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Docgen',

  props: {
    components: {
      type: Array,
      required: true,
    },
  },

  computed: {
    docs() {
      const docs = [];
      this.components.forEach(cmp => {
        const data = this.$page.componentsDocgen[cmp];
        if (data && (data.props || data.events)) docs.push(data);
      });
      console.log(docs);
      return docs;
    },
  },
};
</script>
