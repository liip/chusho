<template>
  <CBtn @click="open = true">Open Modal</CBtn>

  <CDialog
    v-model="open"
    :transition="{ name: 'dialog' }"
    aria-labelledby="dialog-title"
    :teleport="false"
  >
    <div class="py-6 px-8">
      <h1 id="dialog-title" class="mb-3 text-2xl font-bold">Are you sure?</h1>

      <p>
        You’re about to delete the file “<strong>cute-kitten.jpg</strong>”, are
        you sure? This action cannot be reverted.
      </p>
    </div>

    <footer class="py-4 px-8 bg-gray-100 flex justify-between items-center">
      <CBtn variant="link" @click="open = false">Cancel</CBtn>
      <CBtn @click="open = false">Delete</CBtn>
    </footer>
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
