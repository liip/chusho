<template>
  <CTabs default-tab="3">
    <CTabList
      data-test="tablist"
      aria-label="Example of tabs with different style"
      class="flex justify-center mb-3"
      bare
    >
      <CTab
        target="1"
        data-test="tab-1"
        :class-generator="getTabClass"
        class="py-2 px-5 rounded-full"
        bare
        >Tab 1</CTab
      >
      <CTab
        target="2"
        data-test="tab-2"
        :class-generator="getTabClass"
        class="py-2 px-5 rounded-full"
        bare
        >Tab 2</CTab
      >
      <CTab
        target="3"
        data-test="tab-3"
        :class-generator="getTabClass"
        class="py-2 px-5 rounded-full"
        bare
        >Tab 3</CTab
      >
    </CTabList>

    <CTabPanels>
      <CTabPanel id="1" data-test="tabpanel-1" bare>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam in,
        iste id nobis dolor excepturi dolore expedita vero quae. Nobis fuga
        cupiditate suscipit blanditiis, aliquid minima harum molestias pariatur
        tempora ab.
      </CTabPanel>
      <CTabPanel id="2" data-test="tabpanel-2" bare>
        Nobis fuga cupiditate suscipit blanditiis, aliquid minima harum
        molestias pariatur tempora ab, libero quo maiores sapiente doloribus
        nihil commodi eaque accusantium praesentium! Nobis natus qui voluptate
        inventore molestias quisquam, consequuntur harum?
      </CTabPanel>
      <CTabPanel id="3" data-test="tabpanel-3" bare>
        Laboriosam in, iste id nobis dolor excepturi dolore expedita vero quae.
        Nobis natus qui voluptate inventore molestias quisquam, consequuntur
        harum?
      </CTabPanel>
    </CTabPanels>
  </CTabs>
</template>

<script>
export default {
  methods: {
    getTabClass(active) {
      return {
        'text-red-700': !active,
        'text-white font-semibold bg-red-700': active,
      };
    },
  },
};
</script>
