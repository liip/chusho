<template>
  <Form :initial-values="{ color: '' }">
    <Field
      v-slot="{ field, handleChange, errorMessage }"
      name="color"
      :rules="isRequired"
    >
      <CSelect
        :model-value="field.value"
        :input="{ ...field, required: true }"
        @update:modelValue="handleChange"
      >
        <CSelectBtn v-slot="{ open }" class="flex items-center">
          <span v-if="field.value.label">{{ field.value.label }}</span>
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
      <div v-if="errorMessage" class="mt-2 text-red-700">
        {{ errorMessage }}
      </div>
    </Field>
  </Form>
</template>

<script>
import { Form, Field } from 'vee-validate';

export default {
  components: {
    Form,
    Field,
  },

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
      items,
    };
  },

  methods: {
    isRequired(value) {
      return value ? true : 'This field is required';
    },
  },
};
</script>
