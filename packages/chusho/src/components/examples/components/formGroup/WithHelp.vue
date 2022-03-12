<template>
  <CFormGroup v-slot="{ ids }">
    <CLabel>Label</CLabel>
    <CTextarea :aria-describedby="ids.help" />
    <div :id="ids.help">This text describe the field above.</div>
  </CFormGroup>
</template>
