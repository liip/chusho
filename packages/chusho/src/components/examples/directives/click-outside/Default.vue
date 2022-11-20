<template>
  <CBtn v-clickOutside="clickOutside" @click="click"> Click inside </CBtn>
</template>

<script lang="ts">
export default {
  methods: {
    click() {
      alert('Clicked inside');
    },

    clickOutside() {
      alert('Clicked outside');
    },
  },
};
</script>
