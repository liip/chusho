<template>
  <CMenu :disabled="disabled">
    <CMenuBtn v-slot="{ active }">
      <span>Disabled item</span>
      <CIcon
        id="caret"
        :scale="0.375"
        class="text-gray-600 ml-3 transition-transform"
        :class="{ 'transform rotate-180': active }"
      />
    </CMenuBtn>
    <CMenuList>
      <CMenuItem>Do laborum</CMenuItem>
      <CMenuItem :disabled="itemDisabled">Voluptate aute</CMenuItem>
      <CMenuItem>Consectetur et ex commodo </CMenuItem>
      <CMenuSeparator />
      <CMenuItem>Aliquip veniam</CMenuItem>
      <CMenuItem>Laboris do</CMenuItem>
    </CMenuList>
  </CMenu>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const disabled = ref(false);
    const itemDisabled = ref(false);

    setTimeout(() => (itemDisabled.value = true), 2000);

    return {
      disabled,
      itemDisabled,
    };
  },
});
</script>
