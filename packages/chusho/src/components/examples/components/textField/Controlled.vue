<template>
  <CTextField v-model="text" />
</template>

<script setup>
import { ref } from 'vue';

const text = ref(null);
</script>
