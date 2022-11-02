<template>
  <CTabs :default-tab="1" data-test="tabs">
    <CTabList aria-label="Dynymic tabs" data-test="tablist">
      <CTab
        v-for="(tab, i) in tabs"
        :key="i"
        :target="tab"
        :data-test="`tab-${tab}`"
        >Tab {{ tab }}</CTab
      >
    </CTabList>

    <CTabPanels data-test="tabpanels">
      <CTabPanel
        v-for="(tab, i) in tabs"
        :id="tab"
        :key="i"
        :data-test="`tabpanel-${tab}`"
      >
        Tab {{ tab }} content
      </CTabPanel>
    </CTabPanels>
  </CTabs>

  <div class="flex justify-stretch space-x-4 mt-5">
    <CBtn variant="primary" data-test="add-tab" @click="addTab">Add tab</CBtn>
    <CBtn data-test="remove-tab" @click="removeTab">Remove tab</CBtn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [1, 2, 3],
    };
  },

  methods: {
    addTab() {
      this.tabs.push(this.tabs.length + 1);
    },

    removeTab() {
      this.tabs.pop();
    },
  },
};
</script>
