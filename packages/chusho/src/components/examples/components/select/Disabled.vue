<template>
  <CSelect v-model="value" disabled>
    <CSelectBtn class="flex items-center">
      <span>{{ value.label }}</span>
      <CIcon id="caret" :scale="0.375" class="text-gray-600 ml-3" />
    </CSelectBtn>
    <CSelectOptions>
      <CSelectOption v-for="item in items" :key="item.value" :value="item">
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

<script>
export default {
  data() {
    const items = [
      {
        label: 'AliceBlue',
        value: '#F0F8FF',
      },
      {
        label: 'AntiqueWhite',
        value: '#FAEBD7',
      },
      {
        label: 'Aqua',
        value: '#00FFFF',
      },
    ];

    return {
      value: items[0],
      items,
    };
  },
};
</script>
