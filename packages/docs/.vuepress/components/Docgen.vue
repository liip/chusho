<template>
  <div class="mt-4">
    <CTabs v-if="docs.length > 1">
      <CTabList aria-label="Components">
        <CTab v-for="(doc, i) in docs" :key="i" :target="doc.displayName">{{
          doc.displayName
        }}</CTab>
      </CTabList>

      <CTabPanels>
        <CTabPanel v-for="(doc, i) in docs" :key="i" :id="doc.displayName">
          <PropsTable
            :sections="[
              {
                label: 'Props',
                rows: doc.props,
              },
            ]"
          />
        </CTabPanel>
      </CTabPanels>
    </CTabs>
    <PropsTable
      v-else
      :sections="[
        {
          label: 'Props',
          rows: docs[0].props,
        },
      ]"
    />
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
      return this.components.map(cmp => this.$page.componentsDocgen[cmp]);
    },
  },
};
</script>