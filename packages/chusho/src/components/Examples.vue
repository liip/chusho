<template>
  <div id="preview" class="p-5">
    <router-view v-slot="{ Component, route }">
      <component
        :is="Component"
        ref="comp"
        :key="route.meta.usePathKey ? route.path : undefined"
      />
    </router-view>
  </div>
</template>

<script>
import { ref, defineComponent, watchEffect } from 'vue';

export default defineComponent({
  setup() {
    const comp = ref(null);

    watchEffect(() => {
      if (!comp.value) return;

      const optionsState = comp.value.$data;
      const compositionState = comp.value.$.setupState;

      window.postMessage(
        JSON.stringify({
          type: 'updateState',
          state: Object.assign({}, optionsState, compositionState),
        }),
        window.location
      );
    });

    return { comp };
  },

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
