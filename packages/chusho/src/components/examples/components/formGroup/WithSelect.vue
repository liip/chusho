<template>
  <CFormGroup required>
    <CLabel>Label</CLabel>
    <SelectDefault />
  </CFormGroup>
</template>

<script lang="ts">
import SelectDefault from '../select/Default.vue';

export default {
  components: {
    SelectDefault,
  },
};
</script>
