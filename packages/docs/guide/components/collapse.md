# Collapse

Conditionnaly display some content.

<Sandbox id="ccollapse-w80b1" />

## Config

The options below are to be set in the [global configuration](/guide/config.html) at the following location:

```js
{
    components: {
        collapse: {
            // ...
        },
        collapseBtn: {
            // ...
        }
        collapseContent: {
            // ...
        }
    }
}
```

### CCollapse, CCollapseBtn and CCollapseContent

#### class

Classes applied to the component root element, except when the prop `bare` is set to `true`. See [styling components](/guide/styling-components/).

-   **type:** `Array<String | Object> | Object | String | (props: Object) => {}`
-   **default:** `null`

##### Example

Using the `CCollapseBtn` component:

```js
class({ active }) {
    return ['collapse-btn', {
        'collapse-btn--active': active,
    }]
}
```

### CCollapseBtn

#### inheritBtnClass

Since the CCollapseBtn is a CBtn in the background, it will inherits its `class` config option. To disable this behavior, set this option to `false`.

-   **type:** `Boolean`
-   **default:** `true`

### CCollapseContent

#### transition

Apply a common transition to all Collapses. The object can contain any Vue built-in [transition component props](https://v3.vuejs.org/api/built-in-components.html#transition).

-   **type:** `object`
-   **default:** `null`

##### Example

```js
{ name: 'fade', mode: 'out-in' }
```

## API

<Docgen :components="['CCollapse', 'CCollapseBtn', 'CCollapseContent']" />

## Examples

### Simplest

```vue
<CCollapse>
  <CCollapseBtn>Collapse</CCollapseBtn>
  <CCollapseContent>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam in, iste id nobis dolor excepturi dolore expedita vero quae. Nobis fuga cupiditate suscipit blanditiis, aliquid minima harum molestias pariatur tempora ab, libero quo maiores sapiente doloribus nihil commodi eaque accusantium praesentium! Nobis natus qui voluptate inventore molestias quisquam, consequuntur harum?
  </CCollapseContent>
</CCollapse>
```

### Controlled

You can control the Collapse status with the `v-model` directive, for example to make it open by default or to programatically change its state.

```vue
<script>
export default {
    data() {
        return { collapseOpen: true };
    },
};
</script>

<template>
    <CCollapse v-model="collapseOpen">
        <CCollapseBtn>{{ collapseOpen ? 'Close' : 'Open' }}</CCollapseBtn>
        <CCollapseContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            in, iste id nobis dolor excepturi dolore expedita vero quae. Nobis
            fuga cupiditate suscipit blanditiis, aliquid minima harum molestias
            pariatur tempora ab, libero quo maiores sapiente doloribus nihil
            commodi eaque accusantium praesentium! Nobis natus qui voluptate
            inventore molestias quisquam, consequuntur harum?
        </CCollapseContent>
    </CCollapse>
</template>
```

### With transition

Here’s an example where the transition is directly passed as a prop to the `CCollapseContent`. You can also define it globally for all your collapses; see the [config](#config).

```vue
<CCollapse>
  <CCollapseBtn>Collapse with transition</CCollapseBtn>
  <CCollapseContent :transition="{ name: 'fade' }">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam in, iste id nobis dolor excepturi dolore expedita vero quae. Nobis fuga cupiditate suscipit blanditiis, aliquid minima harum molestias pariatur tempora ab, libero quo maiores sapiente doloribus nihil commodi eaque accusantium praesentium! Nobis natus qui voluptate inventore molestias quisquam, consequuntur harum?
  </CCollapseContent>
</CCollapse>
```
