<template>
  <CLabel variant="inline" for="my-checkbox">
    <CCheckbox id="my-checkbox" v-model="value" variant="inline" />
    Check me if you can
  </CLabel>
</template>

<script setup>
import { ref } from 'vue';

const value = ref(false);
</script>
