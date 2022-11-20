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

<script lang="ts" setup>
import {
  ComponentInternalInstance,
  ComponentPublicInstance,
  ref,
  watchEffect,
} from 'vue';

const comp = ref<ComponentPublicInstance | null>(null);

watchEffect(() => {
  if (!comp.value) return;

  const optionsState = comp.value.$data;
  const compositionState = (
    comp.value.$ as ComponentInternalInstance & {
      // This is supposed to be Vue internals, but it's the only way to access setup state as far as I know.
      setupState: Record<string, unknown>;
    }
  ).setupState;

  window.postMessage(
    JSON.stringify({
      type: 'updateState',
      state: Object.assign({}, optionsState, compositionState),
    }),
    window.location.toString()
  );
});
</script>
