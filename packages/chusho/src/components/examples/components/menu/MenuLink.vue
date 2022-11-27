<template>
  <CMenu v-slot="{ open }">
    <CMenuBtn>
      <span>Standard links</span>
      <CIcon
        id="caret"
        :scale="0.375"
        class="text-gray-600 ml-3 transition-transform"
        :class="{ 'transform rotate-180': open }"
      />
    </CMenuBtn>
    <CMenuList>
      <CMenuLink href="/examples/components/menu/menu-link">
        Laboris do
      </CMenuLink>
      <CMenuLink href="/examples/components/menu/menu-link">
        Laboris eu mollit
      </CMenuLink>
    </CMenuList>
  </CMenu>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
