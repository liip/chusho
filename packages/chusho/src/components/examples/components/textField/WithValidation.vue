<template>
  <VeeForm @submit="() => {}">
    <Field v-slot="{ field }" name="field" :rules="isRequired">
      <CTextField v-model="value" v-bind="field" />
    </Field>
    <ErrorMessage as="div" name="field" class="mt-2 text-red-700" />
  </VeeForm>
</template>

<script lang="ts">
import { ErrorMessage, Field, Form as VeeForm } from 'vee-validate';

export default {
  components: {
    VeeForm,
    Field,
    ErrorMessage,
  },

  data() {
    return {
      value: '',
    };
  },

  methods: {
    isRequired(val: string) {
      return val ? true : 'This field is required';
    },
  },
};
</script>
