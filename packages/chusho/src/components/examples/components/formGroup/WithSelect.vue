<template>
  <CFormGroup required>
    <CLabel>Label</CLabel>
    <Select />
  </CFormGroup>
</template>

<script>
import Select from '../select/Default.vue';

export default {
  components: {
    Select,
  },
};
</script>
