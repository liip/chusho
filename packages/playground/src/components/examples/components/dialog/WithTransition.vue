<template>
  <CBtn @click="open = true">Open dialog</CBtn>

  <CDialog
    v-model="open"
    :transition="{ name: 'fade' }"
    class="w-full sm:w-3/4 md:w-1/2 lg:w-1/3"
    aria-labelledby="dialog-title"
  >
    <header class="flex pb-3 mb-6 border-b">
      <div class="flex-1">
        <h1 id="dialog-title" class="text-lg font-semibold">Dialog title</h1>
      </div>
      <div class="ml-4">
        <CBtn
          class="p-2 leading-none"
          aria-label="Close dialog"
          bare
          @click="open = false"
        >
          <span>✗</span>
        </CBtn>
      </div>
    </header>

    <p>Lorem ipsum dolor sit amet.</p>
  </CDialog>
</template>

<script>
export default {
  data() {
    return {
      open: false,
    };
  },
};
</script>
