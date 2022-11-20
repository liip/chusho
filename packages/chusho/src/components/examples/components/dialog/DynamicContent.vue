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

    <p class="mb-3">Lorem ipsum dolor sit amet.</p>

    <ul class="space-y-5">
      <li v-for="item in items" :key="item">
        <input
          type="text"
          :name="`item-${item}`"
          class="w-full border px-3 py-2"
          data-test="input"
          :value="`Input ${item}`"
        />
      </li>
      <li class="flex justify-stretch space-x-4">
        <CBtn variant="primary" data-test="add-item" @click="addItem"
          >Add item</CBtn
        >
        <CBtn data-test="remove-item" @click="removeItem">Remove item</CBtn>
      </li>
    </ul>
  </CDialog>
</template>

<script lang="ts">
export default {
  data() {
    return {
      open: true,
      items: [1],
    };
  },

  methods: {
    addItem() {
      this.items.push(this.items.length + 1);
    },

    removeItem() {
      this.items.pop();
    },
  },
};
</script>
