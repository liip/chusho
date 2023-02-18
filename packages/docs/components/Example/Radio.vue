<template>
  <div class="space-x-6">
    <CLabel variant="inline" for="radio-cats">
      <CRadio v-model="value" variant="inline" id="radio-cats" value="cats" />
      Cats
    </CLabel>
    <CLabel variant="inline" for="radio-dogs">
      <CRadio v-model="value" variant="inline" id="radio-dogs" value="dogs" />
      Dogs
    </CLabel>
    <CLabel variant="inline" for="radio-both">
      <CRadio v-model="value" variant="inline" id="radio-both" value="both" />
      Both
    </CLabel>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const value = ref('both');
</script>
