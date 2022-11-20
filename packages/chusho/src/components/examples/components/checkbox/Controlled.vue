<template>
  <CLabel variant="inline" for="checkbox">
    <CCheckbox id="checkbox" v-model="value" variant="inline" />
    Check me if you can
  </CLabel>
</template>

<script lang="ts">
export default {
  data() {
    return {
      value: false,
    };
  },
};
</script>
