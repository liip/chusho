# Click Outside

Trigger a function when a click happens outside the element with the said directive applied.

## Examples

### Simple

```vue
<template>
  <CBtn v-clickOutside="handleClickOutside">Label</CBtn>
</template>

<script setup>
function handleClickOutside(event) {
  // Do something
}
</script>
```

### Ignoring elements

This is useful in the case of dynamically rendered elements. To avoid the click on the trigger from immediately removing the target due to event bubbling, the triggers must be ignored.

```vue
<template>
  <CBtn ref="btnRef" @click="displaySpoiler = !displaySpoiler">
    Toggle spoiler
  </CBtn>

  <div
    v-if="displaySpoiler"
    v-clickOutside="{
      handler: () => (displaySpoiler = false),
      options: {
        ignore: [btnRef],
      },
    }"
  >
    Spoiler alert!
  </div>
</template>

<script setup>
import { ref } from 'vue';

const btnRef = ref(null);
const displaySpoiler = ref(false);
</script>
```

## API

- **Expects:** `Function | { handler: Function, options: ClickOutsideOptions }`

```ts
interface ClickOutsideOptions {
  // Click on or within ignored elements will not trigger the handler
  ignore?: Array<HTMLElement | SVGElement>;
}
```

The function receive the original click Event as the first argument.
