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

<script setup>
import { ref, watchEffect } from 'vue';

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
</script>
