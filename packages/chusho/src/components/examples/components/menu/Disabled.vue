<template>
  <CMenu v-slot="{ open }" disabled>
    <CMenuBtn>
      <span>Disabled menu</span>
      <CIcon
        id="caret"
        :scale="0.375"
        class="text-gray-600 ml-3 transition-transform"
        :class="{ 'transform rotate-180': open }"
      />
    </CMenuBtn>
    <CMenuList>
      <CMenuItem>Do laborum</CMenuItem>
      <CMenuItem>Voluptate aute</CMenuItem>
      <CMenuItem disabled>Consectetur et ex commodo </CMenuItem>
      <CMenuSeparator />
      <CMenuItem>Aliquip veniam</CMenuItem>
      <CMenuItem>Laboris do</CMenuItem>
    </CMenuList>
  </CMenu>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
