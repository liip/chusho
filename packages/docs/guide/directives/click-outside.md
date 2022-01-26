# Click Outside

Trigger a function when a click happens outside the element with the said directive applied.

```vue
<template>
  <CBtn v-clickOutside="handleClickOutside">Label</CBtn>
</template>

<script>
export default {
  methods: {
    handleClickOutside(event) {
      // Do something
    },
  },
};
</script>
```

## v-clickOutside

- **Expects:** `Function`

The function receive the original click Event as the first argument.
