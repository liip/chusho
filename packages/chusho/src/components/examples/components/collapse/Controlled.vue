<template>
  <CCollapse v-model="collapseOpen" class="relative">
    <CCollapseBtn data-test="collapse-button">
      {{ collapseOpen ? 'Close' : 'Open' }}
    </CCollapseBtn>
    <CCollapseContent
      data-test="collapse-content"
      class="absolute max-w-xs mt-3 py-3 px-4 text-blue-800 bg-blue-100 border-2 border-blue-200 shadow-lg rounded"
      bare
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </CCollapseContent>
  </CCollapse>

  <p class="mt-5">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, vitae autem
    adipisci necessitatibus cum quae quam? Dignissimos nesciunt nemo voluptate,
    animi reiciendis aperiam a vel amet earum, iure reprehenderit nulla. Quaerat
    iusto aspernatur perspiciatis ad temporibus. Nisi ipsam eaque consectetur!
  </p>

  <CBtn
    class="mt-6"
    data-test="model-toggle"
    @click="collapseOpen = !collapseOpen"
  >
    Toggle v-model
  </CBtn>
</template>

<script lang="ts">
export default {
  data() {
    return {
      collapseOpen: true,
    };
  },
};
</script>
