<template>
  <CMenu v-slot="{ open }" v-model="value" multiple>
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
      <CMenuItem
        v-for="item in items"
        :key="item.value"
        :value="item.value"
        :disabled="item.disabled"
      >
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
      value: ref([]),
      items: [
        {
          label: 'Do laborum',
          value: {
            id: 1,
            value: 'lorem',
          },
        },
        {
          label: 'Voluptate aute',
          value: {
            id: 2,
            value: 'ipsum',
          },
          disabled: true,
        },
        {
          label: 'Consectetur et ex commodo',
          value: {
            id: 3,
            value: 'dolor',
          },
        },
        {
          label: 'Aliquip veniam',
          value: {
            id: 4,
            value: 'sit',
          },
        },
        {
          label: 'Laboris do',
          value: {
            id: 5,
            value: 'amet',
          },
        },
      ],
    };
  },
};
</script>
