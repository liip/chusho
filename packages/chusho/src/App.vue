<template>
  <router-view v-if="route.matched.length"></router-view>
  <div v-else class="p-5">
    <CAlert variant="error">
      Route <strong>{{ route.path }}</strong> does not exist.
    </CAlert>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

onMounted(() => {
  window.addEventListener('message', (message) => {
    try {
      const payload = JSON.parse(message.data);
      if (payload.type === 'changePreview' && payload.to) {
        router.replace(payload.to);
      }
    } catch (error) {
      // Noop
    }
  });
});
</script>
