<template>
  <CTabs v-model="activeTab" data-test="tabs" class="custom-tabs" bare>
    <CTabList
      data-test="tablist"
      aria-label="Example of tabs with different style"
      class="flex justify-center mb-3"
      bare
    >
      <CTab
        v-for="num in ['1', '2', '3']"
        :key="num"
        :target="num"
        :data-test="`tab-${num}`"
        class="py-2 px-5 rounded-full"
        :class="{
          'text-red-700': activeTab !== num,
          'text-white font-semibold bg-red-700': activeTab === num,
        }"
        bare
        >Tab {{ num }}</CTab
      >
    </CTabList>

    <CTabPanels data-test="tabpanels" class="custom-tabpanels" bare>
      <CTabPanel id="1" data-test="tabpanel-1" class="custom-tabpanel" bare>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam in,
        iste id nobis dolor excepturi dolore expedita vero quae. Nobis fuga
        cupiditate suscipit blanditiis, aliquid minima harum molestias pariatur
        tempora ab.
      </CTabPanel>
      <CTabPanel id="2" data-test="tabpanel-2" class="custom-tabpanel" bare>
        Nobis fuga cupiditate suscipit blanditiis, aliquid minima harum
        molestias pariatur tempora ab, libero quo maiores sapiente doloribus
        nihil commodi eaque accusantium praesentium! Nobis natus qui voluptate
        inventore molestias quisquam, consequuntur harum?
      </CTabPanel>
      <CTabPanel id="3" data-test="tabpanel-3" class="custom-tabpanel" bare>
        Laboriosam in, iste id nobis dolor excepturi dolore expedita vero quae.
        Nobis natus qui voluptate inventore molestias quisquam, consequuntur
        harum?
      </CTabPanel>
    </CTabPanels>
  </CTabs>
</template>

<script>
export default {
  data() {
    return {
      activeTab: '3',
    };
  },
};
</script>
