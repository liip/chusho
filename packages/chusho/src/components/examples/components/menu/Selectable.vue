<template>
  <CMenu>
    <CMenuBtn v-slot="{ active }">
      <span>Selectable items</span>
      <CIcon
        id="caret"
        :scale="0.375"
        class="text-gray-600 ml-3 transition-transform"
        :class="{ 'transform rotate-180': active }"
      />
    </CMenuBtn>
    <CMenuList :multiple="false">
      <CMenuItem
        v-for="item in items"
        :key="item.value"
        :value="item.value"
        @select="handleSelect"
      >
        {{ item.label }}
      </CMenuItem>
    </CMenuList>
  </CMenu>
</template>

<script>
export default {
  setup() {
    return {
      handleSelect: (id) => {
        console.log('select', id);
      },
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
