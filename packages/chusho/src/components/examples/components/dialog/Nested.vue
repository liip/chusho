<template>
  <CBtn @click="open = true">Open dialog</CBtn>

  <CDialog
    v-model="open"
    class="w-full sm:w-3/4 md:w-1/2 lg:w-1/3"
    aria-labelledby="dialog-title"
    data-test="dialog"
    :overlay="{ 'data-test': 'dialog-overlay' }"
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
          data-test="close-btn"
          @click="open = false"
        >
          <span>✗</span>
        </CBtn>
      </div>
    </header>

    <p>Lorem ipsum dolor sit amet.</p>

    <div class="mt-4">
      <CBtn data-test="nested-trigger" @click="childOpen = true"
        >Open Child Dialog</CBtn
      >
    </div>
  </CDialog>

  <CDialog
    v-model="childOpen"
    class="p-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-white rounded-xl shadow-xl"
    :overlay="{
      class:
        'fixed inset-0 p-4 flex flex-columns items-center justify-center bg-blue-500 bg-opacity-75',
    }"
    bare
  >
    <div>
      Hello, I’m a nested Dialog with different styling, nice to meet you.
    </div>

    <CBtn class="font-semibold mt-4" bare @click="childOpen = false"
      >Cancel</CBtn
    >
  </CDialog>
</template>

<script>
export default {
  data() {
    return {
      open: false,
      childOpen: false,
    };
  },
};
</script>
