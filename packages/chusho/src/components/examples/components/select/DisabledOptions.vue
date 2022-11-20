<template>
  <CSelect v-model="value" v-model:open="open">
    <CSelectBtn class="flex items-center">
      <span>{{ value.label }}</span>
      <CIcon
        id="caret"
        :scale="0.375"
        class="text-gray-600 ml-3"
        :class="{ 'transform rotate-180': open }"
      />
    </CSelectBtn>
    <CSelectOptions>
      <CSelectOption
        v-for="item in items"
        :key="item.value"
        :value="item"
        :disabled="item.disabled"
      >
        <CIcon
          v-if="item === value"
          id="check"
          :scale="0.375"
          class="absolute left-2 top-2 -mt-px"
        />
        {{ item.label }}
      </CSelectOption>
    </CSelectOptions>
  </CSelect>
</template>

<script lang="ts">
export default {
  data() {
    const items = [
      {
        label: 'Aqua',
        value: '#00FFFF',
      },
      {
        label: 'Chartreuse',
        value: '#7FFF00',
        disabled: true,
      },
      {
        label: 'Coral',
        value: '#FF7F50',
      },
      {
        label: 'Orchid',
        value: '#DA70D6',
      },
      {
        label: 'Tomato',
        value: '#FF6347',
        disabled: true,
      },
    ];

    return {
      value: items[3],
      items,
      open: false,
    };
  },
};
</script>
