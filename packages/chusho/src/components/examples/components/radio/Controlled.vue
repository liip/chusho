<template>
  <div class="space-x-6">
    <CLabel for="radio-1" variant="inline">
      <CRadio
        id="radio-1"
        v-model="value"
        variant="inline"
        name="radio-group"
        type="radio"
        :value="true"
      />
      True
    </CLabel>
    <CLabel for="radio-2" variant="inline">
      <CRadio
        id="radio-2"
        v-model="value"
        variant="inline"
        name="radio-group"
        type="radio"
        :value="false"
      />
      False
    </CLabel>
    <CLabel for="radio-3" variant="inline">
      <CRadio
        id="radio-3"
        v-model="value"
        variant="inline"
        name="radio-group"
        type="radio"
        value="other"
      />
      Other
    </CLabel>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const value = ref(false);
</script>
