<template>
  <div class="home">
    <h1 class="text-xl font-bold mb-4">Chūshō playground</h1>

    <CBtn variant="medium primary" @click="sayHello">Say hello</CBtn>
  </div>
</template>

<script>
import { CBtn } from 'chusho';

export default {
  name: 'Home',

  components: {
    CBtn,
  },

  methods: {
    sayHello() {
      alert('👋 Hello');
    },
  },
};
</script>
