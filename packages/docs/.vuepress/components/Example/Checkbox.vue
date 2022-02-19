<template>
  <CLabel variant="inline" for="my-checkbox">
    <CCheckbox v-model="value" variant="inline" id="my-checkbox" />
    Check me if you can
  </CLabel>
</template>

<script setup>
import { ref } from 'vue';

const value = ref(false);
</script>
