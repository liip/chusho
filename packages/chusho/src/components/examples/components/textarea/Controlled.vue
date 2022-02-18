<template>
  <CTextarea v-model="text" />
</template>

<script setup>
import { ref } from 'vue';

const text = ref('Default value');
</script>
