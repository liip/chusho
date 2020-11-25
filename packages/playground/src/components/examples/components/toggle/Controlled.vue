<template>
  <CToggle v-model="toggleOpen" class="relative">
    <CToggleBtn data-test="toggle-button">
      {{ toggleOpen ? 'Close' : 'Open' }}
    </CToggleBtn>
    <CToggleContent
      data-test="toggle-content"
      class="absolute max-w-xs mt-3 py-3 px-4 text-blue-800 bg-blue-200 border-2 border-blue-300 shadow-lg rounded"
      bare
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </CToggleContent>
  </CToggle>

  <p class="mt-5">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, vitae autem
    adipisci necessitatibus cum quae quam? Dignissimos nesciunt nemo voluptate,
    animi reiciendis aperiam a vel amet earum, iure reprehenderit nulla. Quaerat
    iusto aspernatur perspiciatis ad temporibus. Nisi ipsam eaque consectetur!
  </p>
</template>

<script>
export default {
  data() {
    return {
      toggleOpen: true,
    };
  },
};
</script>
