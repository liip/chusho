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
    <CMenuList :multiple="true" @change="handleChange">
      <CMenuItem
        v-for="item in items"
        :key="item.value"
        :value="item.value"
        :disabled="item.disabled"
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
      handleSelect: (value) => {
        console.log('select', value);
      },
      handleChange: (values) => {
        console.log('change', values);
      },
      items: [
        {
          label: 'Do laborum',
          value: 'lorem',
        },
        {
          label: 'Voluptate aute',
          value: 'ipsum',
          disabled: true,
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
