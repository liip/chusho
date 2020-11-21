<template>
  <CBtn v-clickOutside="clickOutside" variant="default medium" @click="click">
    Click inside
  </CBtn>
</template>

<script>
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
