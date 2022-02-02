<template>
  <CSelect v-model="value" v-model:open="open">
    <CSelectBtn class="flex items-center">
      <span v-if="value.label">{{ value.label }}</span>
      <span v-else class="text-gray-400">Select a value…</span>
      <CIcon
        id="caret"
        :scale="0.375"
        class="text-gray-600 ml-3"
        :class="{ 'transform rotate-180': open }"
      />
    </CSelectBtn>
    <CSelectOptions>
      <CSelectOption value=""></CSelectOption>
      <CSelectGroup v-for="group in groups" :key="group.label">
        <CSelectGroupLabel>{{ group.label }}</CSelectGroupLabel>
        <CSelectOption
          v-for="option in group.options"
          :key="option.value"
          :value="option"
        >
          <CIcon
            v-if="option === value"
            id="check"
            :scale="0.375"
            class="absolute left-2 top-2 -mt-px"
          />
          {{ option.label }}
        </CSelectOption>
      </CSelectGroup>
    </CSelectOptions>
  </CSelect>
</template>

<script>
export default {
  data() {
    const groups = [
      {
        label: 'Cold',
        options: [
          {
            label: 'AliceBlue',
            value: '#F0F8FF',
          },
          {
            label: 'Aqua',
            value: '#00FFFF',
          },
          {
            label: 'Azure',
            value: '#F0FFFF',
          },
        ],
      },
      {
        label: 'Warm',
        options: [
          {
            label: 'Fuchsia',
            value: '#FF00FF',
          },
          {
            label: 'Indigo',
            value: '#4B0082',
          },
          {
            label: 'LightCoral',
            value: '#F08080',
          },
        ],
      },
    ];

    return {
      value: '',
      groups,
      open: false,
    };
  },
};
</script>
