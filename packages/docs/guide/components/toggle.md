# Toggle

Conditionnaly display some content.

<Sandbox id="ccollapse-w80b1" />

## Config

### CToggle, CToggleBtn and CToggleContent

#### class

Classes applied to the component root element, except when the prop `bare` is set to `true`. See [styling components](/guide/styling-components/).

-   **type:** `Array<String | Object> | Object | String | (props: Object) => {}`
-   **default:** `null`

##### Example

Using the `CToggleBtn` component:

```js
class({ active }) {
    return ['toggle-btn', {
        'toggle-btn--active': active,
    }]
}
```

### CToggleBtn

#### inheritBtnClass

Since the CToggleBtn is a CBtn in the background, it will inherits its `class` config option. To disable this behavior, set this option to `false`.

-   **type:** `Boolean`
-   **default:** `true`

### CToggleContent

#### transition

Apply a common transition to all Toggles. The object can contain any Vue built-in [transition component props](https://v3.vuejs.org/api/built-in-components.html#transition).

-   **type:** `object`
-   **default:** `null`

##### Example

```js
{ name: 'fade', mode: 'out-in' }
```

## API

<Docgen :components="['CToggle', 'CToggleBtn', 'CToggleContent']" />

## Examples

### Simplest

```vue
<CToggle>
  <CToggleBtn>Toggle</CToggleBtn>
  <CToggleContent>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam in, iste id nobis dolor excepturi dolore expedita vero quae. Nobis fuga cupiditate suscipit blanditiis, aliquid minima harum molestias pariatur tempora ab, libero quo maiores sapiente doloribus nihil commodi eaque accusantium praesentium! Nobis natus qui voluptate inventore molestias quisquam, consequuntur harum?
  </CToggleContent>
</CToggle>
```

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
        <CToggleBtn>{{ toggleOpen ? 'Close' : 'Open' }}</CToggleBtn>
        <CToggleContent>
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
  <CToggleBtn>Toggle with transition</CToggleBtn>
  <CToggleContent :transition="{ name: 'fade' }">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam in, iste id nobis dolor excepturi dolore expedita vero quae. Nobis fuga cupiditate suscipit blanditiis, aliquid minima harum molestias pariatur tempora ab, libero quo maiores sapiente doloribus nihil commodi eaque accusantium praesentium! Nobis natus qui voluptate inventore molestias quisquam, consequuntur harum?
  </CToggleContent>
</CToggle>
```
