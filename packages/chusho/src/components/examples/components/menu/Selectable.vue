<template>
  <CMenu v-slot="{ open }" v-model="value">
    <CMenuBtn>
      <span>Selectable items</span>
      <CIcon
        id="caret"
        :scale="0.375"
        class="text-gray-600 ml-3 transition-transform"
        :class="{ 'transform rotate-180': open }"
      />
    </CMenuBtn>
    <CMenuList>
      <CMenuItem v-for="item in items" :key="item.value" :value="item.value">
        {{ item.label }}
      </CMenuItem>
    </CMenuList>
  </CMenu>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    return {
      value: ref('ipsum'),
      items: [
        {
          label: 'Do laborum',
          value: 'lorem',
        },
        {
          label: 'Voluptate aute',
          value: 'ipsum',
        },
        {
          label: 'Consectetur et ex commodo',
          value: 'dolor',
        },
        {
          label: 'Aliquip veniam',
          value: 'sit',
        },
        {
          label: 'Laboris do',
          value: 'amet',
        },
      ],
    };
  },
};
</script>
