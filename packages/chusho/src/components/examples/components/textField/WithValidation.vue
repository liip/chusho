<template>
  <Form @submit="() => {}">
    <Field v-slot="{ field }" name="field" :rules="isRequired">
      <CTextField v-model="value" v-bind="field" />
    </Field>
    <ErrorMessage as="div" name="field" class="mt-2 text-red-700" />
  </Form>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },

  data() {
    return {
      value: '',
    };
  },

  methods: {
    isRequired(val) {
      return val ? true : 'This field is required';
    },
  },
};
</script>
