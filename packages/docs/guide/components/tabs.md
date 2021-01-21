# Tabs

Accessible tabs component.

<Sandbox id="ctabs-ik4zk" />

## Config

The options below are to be set in the [global configuration](/guide/config.html) at the following location:

```js
{
    components: {
        tabs: {
            // ...
        },
        tabList: {
            // ...
        },
        tab: {
            // ...
        },
        tabPanels: {
            // ...
        },
        tabPanel: {
            // ...
        },
    }
}
```

### CTabs, CTabList, CTab, CTabPanels and CTabPanel

#### class

Classes applied to the component root element, except when the prop `bare` is set to `true`. See [styling components](/guide/styling-components/).

-   **type:** `Array<String | Object> | Object | String | (props: Object) => {}`
-   **default:** `null`

##### Example

Using the `CTab` component:

```js
class({ variant, active }) {
    return ['tab', {
        'tab--active': active,
    }]
}
```

## API

<Docgen :components="['CTabs', 'CTabList', 'CTab', 'CTabPanels', 'CTabPanel']" />

## Examples

### Simplest

```vue
<CTabs>
  <CTabList aria-label="Example of tabs">
    <CTab target="1">Tab 1</CTab>
    <CTab target="2">Tab 2</CTab>
    <CTab target="3">Tab 3</CTab>
  </CTabList>

  <CTabPanels>
    <CTabPanel id="1">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam in, iste id nobis dolor excepturi dolore expedita vero quae. Nobis fuga cupiditate suscipit blanditiis, aliquid minima harum molestias pariatur tempora ab.
    </CTabPanel>
    <CTabPanel id="2">
      Nobis fuga cupiditate suscipit blanditiis, aliquid minima harum molestias pariatur tempora ab, libero quo maiores sapiente doloribus nihil commodi eaque accusantium praesentium! Nobis natus qui voluptate inventore molestias quisquam, consequuntur harum?
    </CTabPanel>
    <CTabPanel id="3">
      Laboriosam in, iste id nobis dolor excepturi dolore expedita vero quae. Nobis natus qui voluptate inventore molestias quisquam, consequuntur harum?
    </CTabPanel>
  </CTabPanels>
</CTabs>
```

### Controlled

Set a `v-model` on the `CTabs` component to control the active tab.

```vue
<script>
export default {
    data() {
        return { currentTab: '2' };
    },
};
</script>

<template>
    <CTabs v-model="currentTab">
        <CTabList aria-label="Example of controlled tabs">
            <CTab target="1">Tab 1</CTab>
            <CTab target="2">Tab 2</CTab>
        </CTabList>

        <CTabPanels>
            <CTabPanel id="1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laboriosam in, iste id nobis dolor excepturi dolore expedita
                vero quae. Nobis fuga cupiditate suscipit blanditiis, aliquid
                minima harum molestias pariatur tempora ab.
            </CTabPanel>
            <CTabPanel id="2">
                Nobis fuga cupiditate suscipit blanditiis, aliquid minima harum
                molestias pariatur tempora ab, libero quo maiores sapiente
                doloribus nihil commodi eaque accusantium praesentium! Nobis
                natus qui voluptate inventore molestias quisquam, consequuntur
                harum?
            </CTabPanel>
        </CTabPanels>
    </CTabs>
</template>
```
