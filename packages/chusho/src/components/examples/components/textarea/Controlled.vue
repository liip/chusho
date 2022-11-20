<template>
  <CTextarea v-model="text" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const text = ref('Default value');
</script>
