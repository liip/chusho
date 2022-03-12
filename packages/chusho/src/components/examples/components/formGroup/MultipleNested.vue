<template>
  <CFormGroup v-slot="{ ids }" :as="false" required>
    <CLabel>Fruits</CLabel>
    <ul :aria-labelledby="ids.label">
      <CFormGroup v-for="fruit in fruits" :key="fruit" as="li">
        <CLabel variant="inline">
          <CCheckbox v-model="state[fruit]" variant="inline" />
          {{ fruit }}
        </CLabel>
      </CFormGroup>
    </ul>
  </CFormGroup>
</template>

<script setup>
import { reactive } from 'vue';

const fruits = ['Banana', 'Apple', 'Kiwi'];

const state = reactive({
  Banana: true,
  Apple: false,
  Kiwi: false,
});
</script>
