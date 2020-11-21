# Toggle

Conditionnaly display some content.

```vue
<CToggle>
  <CToggleBtn variant="medium default">Toggle</CToggleBtn>
  <CToggleContent class="mt-4">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam in, iste id nobis dolor excepturi dolore expedita vero quae. Nobis fuga cupiditate suscipit blanditiis, aliquid minima harum molestias pariatur tempora ab, libero quo maiores sapiente doloribus nihil commodi eaque accusantium praesentium! Nobis natus qui voluptate inventore molestias quisquam, consequuntur harum?
  </CToggleContent>
</CToggle>
```

## Config

### transition

-   **type:** `object`

Apply a common transition to all Toggles. The object can contain any Vue built-in [transition component props](https://vuejs.org/v2/api/#transition).

For example:

```js
{ name: 'fade', mode: 'out-in' }
```

## API

<Docgen :components="['CToggle', 'CToggleBtn', 'CToggleContent']" />

## Examples

### Controlled

You can control the Toggle status with the `v-model` directive, for example to make it open by default or to programatically change its state.

```vue
<script>
export default {
    data() {
        return { toggleOpen: true };
    },
};
</script>

<template>
    <CToggle v-model="toggleOpen">
        <CToggleBtn variant="medium default">
            {{ toggleOpen ? 'Close' : 'Open' }}
        </CToggleBtn>

        <CToggleContent class="mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            in, iste id nobis dolor excepturi dolore expedita vero quae. Nobis
            fuga cupiditate suscipit blanditiis, aliquid minima harum molestias
            pariatur tempora ab, libero quo maiores sapiente doloribus nihil
            commodi eaque accusantium praesentium! Nobis natus qui voluptate
            inventore molestias quisquam, consequuntur harum?
        </CToggleContent>
    </CToggle>
</template>
```

### With transition

Here’s an example where the transition is directly passed as a prop to the `CToggleContent`. You can also define it globally for all your toggles; see the [config](#config).

```vue
<CToggle>
  <CToggleBtn variant="medium default">Toggle with transition</CToggleBtn>
  <CToggleContent :transition="{ name: 'fade' }" class="mt-4">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam in, iste id nobis dolor excepturi dolore expedita vero quae. Nobis fuga cupiditate suscipit blanditiis, aliquid minima harum molestias pariatur tempora ab, libero quo maiores sapiente doloribus nihil commodi eaque accusantium praesentium! Nobis natus qui voluptate inventore molestias quisquam, consequuntur harum?
  </CToggleContent>
</CToggle>
```
