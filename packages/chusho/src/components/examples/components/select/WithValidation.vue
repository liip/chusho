<template>
  <VeeForm @submit="() => {}">
    <Field v-slot="{ field }" name="color" :rules="isRequired">
      <CSelect v-model="color" v-bind="field" name="color" data-test="select">
        <CSelectBtn
          v-slot="{ open }"
          class="flex items-center"
          data-test="select-btn"
        >
          <span v-if="field.value?.label">{{ field.value?.label }}</span>
          <span v-else class="text-gray-400">Select a value…</span>
          <CIcon
            id="caret"
            :scale="0.375"
            class="text-gray-600 ml-3"
            :class="{ 'transform rotate-180': open }"
          />
        </CSelectBtn>
        <CSelectOptions data-test="select-options">
          <CSelectOption value=""></CSelectOption>
          <CSelectOption v-for="item in items" :key="item.value" :value="item">
            <CIcon
              v-if="item === field.value"
              id="check"
              :scale="0.375"
              class="absolute left-2 top-2 -mt-px"
            />
            {{ item.label }}
          </CSelectOption>
        </CSelectOptions>
      </CSelect>
    </Field>
    <ErrorMessage as="div" name="color" class="mt-2 text-red-700" />
  </VeeForm>
</template>

<script>
import { ErrorMessage, Field, Form as VeeForm } from 'vee-validate';

export default {
  components: {
    VeeForm,
    Field,
    ErrorMessage,
  },

  data() {
    return {
      color: '',
      items: [
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
      ],
    };
  },

  methods: {
    isRequired(value) {
      return value ? true : 'This field is required';
    },
  },
};
</script>
