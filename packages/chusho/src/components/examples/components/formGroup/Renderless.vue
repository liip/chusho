<template>
  <CFormGroup v-slot="{ required }" :as="false" required>
    <CLabel>
      Label
      <abbr v-if="required" title="Required" aria-label="Required">*</abbr>
    </CLabel>
    <CTextField />
  </CFormGroup>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
