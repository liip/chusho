<template>
  <div id="app">
    <h1>Chūshō playground</h1>
    <p class="mb-4">
      Modify <code>src/App.vue</code> to change this view, here’s an example
      using Chūshō’s Btn component:
    </p>
    <CBtn variant="medium primary" @click="sayHello">Hello</CBtn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  sayHello(): void {
    alert('👋 Hello');
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
