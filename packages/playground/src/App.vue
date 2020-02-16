<template>
  <div id="app">
    <h1>Chūshō playground</h1>
    <p>
      Modify <code>src/App.vue</code> to change this view, here’s an example
      using Chūshō’s Btn component:
    </p>
    <Btn @click="sayHello">Hello</Btn>
  </div>
</template>

<script>
export default {
  name: 'App',

  methods: {
    sayHello() {
      alert('👋 Hello');
    },
  },
};
</script>

<style>
#app {
  margin-top: 60px;

  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
