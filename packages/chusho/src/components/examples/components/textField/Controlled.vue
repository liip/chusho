<template>
  <CTextField
    v-model="text"
    type="email"
    name="email"
    placeholder="hello@chusho.dev"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const text = ref(null);
</script>
