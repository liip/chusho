<template>
  <CMenu v-slot="{ open }">
    <CMenuBtn>
      <span>Router links</span>
      <CIcon
        id="caret"
        :scale="0.375"
        class="text-gray-600 ml-3 transition-transform"
        :class="{ 'transform rotate-180': open }"
      />
    </CMenuBtn>
    <CMenuList>
      <CMenuLink to="/examples/components/menu/router-link">
        Voluptate aute
      </CMenuLink>
      <CMenuLink to="/examples/components/menu/router-link">
        Consectetur et ex commodo
      </CMenuLink>
    </CMenuList>
  </CMenu>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
