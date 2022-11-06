<template>
  <CBtn ref="btnRef" @click="displaySpoiler = !displaySpoiler">
    Toggle spoiler
  </CBtn>

  <div
    v-if="displaySpoiler"
    v-clickOutside="{
      handler: () => (displaySpoiler = false),
      options: {
        ignore: [btnRef],
      },
    }"
  >
    Spoiler alert!
  </div>
</template>

<script setup>
import { ref } from 'vue';

const btnRef = ref(null);
const displaySpoiler = ref(false);
</script>
