<template>
  <div class="wrapper">
    <iframe :src="`https://codesandbox.io/embed/${id}?codemirror=1&fontsize=13&hidenavigation=1&module=%2Fsrc%2FApp.vue&theme=dark&view=preview`"
       sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
       loading="lazy"
       class="iframe"
     ></iframe>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    }
  }
}
</script>

<style scoped>
.wrapper {
  position: relative;

  background-color: black;
}

.wrapper::before {
  content: '';
  display: block;
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  border: 1px solid black;
  pointer-events: none;
}

.iframe {
  display: block;
  width: 100%;
  height: 400px;

  border: 0;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>
