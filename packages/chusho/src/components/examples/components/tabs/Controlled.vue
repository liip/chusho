<template>
  <CTabs v-model="currentTab">
    <CTabList aria-label="Example of controlled tabs">
      <CTab target="1" data-test="tab-1">Tab 1</CTab>
      <CTab target="2" data-test="tab-2">Tab 2</CTab>
      <CTab target="3" data-test="tab-3">Tab 3</CTab>
    </CTabList>

    <CTabPanels>
      <CTabPanel id="1" data-test="tabpanel-1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam in,
        iste id nobis dolor excepturi dolore expedita vero quae. Nobis fuga
        cupiditate suscipit blanditiis, aliquid minima harum molestias pariatur
        tempora ab.
      </CTabPanel>
      <CTabPanel id="2" data-test="tabpanel-2">
        Nobis fuga cupiditate suscipit blanditiis, aliquid minima harum
        molestias pariatur tempora ab, libero quo maiores sapiente doloribus
        nihil commodi eaque accusantium praesentium! Nobis natus qui voluptate
        inventore molestias quisquam, consequuntur harum?
      </CTabPanel>
      <CTabPanel id="3" data-test="tabpanel-3">
        Laboriosam in, iste id nobis dolor excepturi dolore expedita vero quae.
        Nobis natus qui voluptate inventore molestias quisquam, consequuntur
        harum?
      </CTabPanel>
    </CTabPanels>
  </CTabs>
</template>

<script lang="ts">
export default {
  data() {
    return {
      currentTab: '2',
    };
  },
};
</script>
