<template>
  <div id="preview" class="p-5">
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  mounted() {
    window.addEventListener('message', (message) => {
      try {
        const payload = JSON.parse(message.data);
        if (payload.type === 'changePreview' && payload.to) {
          this.$router.replace(payload.to);
        }
      } catch (error) {
        // Noop
      }
    });
  },
});
</script>
