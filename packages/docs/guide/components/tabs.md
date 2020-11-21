# Tabs

Accessible tabs component.

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

## Config

### tabsClass

- **type:** `string`

Class applied to all CTabs components.

### tabListClass

- **type:** `string`

Class applied to all CTabList components.

### tabPanelsClass

- **type:** `string`

Class applied to all CTabPanels components.

### tabPanelClass

- **type:** `string | function`

Example with a function:

```js
function(active) {
  return [
    'tab-panel', // Apply `tab-panel` all the time
    { 'tab-panel--active': active } // Apply `tab-panel--active` only when it’s active
  ]
}
```

Class applied to all CTabPanel components.

Provide a `function` to dynamically apply classes based on the state, in this case it should return a valid Vue “class” syntax (object, array or string), see [Vue class documentation](https://vuejs.org/v2/guide/class-and-style.html).

### tabClass

- **type:** `string | function`

Example with a function:

```js
function(active) {
  return [
    'tab', // Apply `tab-panel` all the time
    { 'tab--active': active } // Apply `tab--active` only when it’s active
  ]
}
```

Class applied to all CTab components.

Provide a `function` to dynamically apply classes based on the state, in this case it should return a valid Vue “class” syntax (object, array or string), see [Vue class documentation](https://vuejs.org/v2/guide/class-and-style.html).

## API

<Docgen :components="['CTabs', 'CTabList', 'CTab', 'CTabPanels', 'CTabPanel']" />

## Examples

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

### Local styling override

Take advantage of the `bare` prop to disable global styling inheritance and create styling variants.

```vue
<script>
export default {
    methods: {
        getTabClass(active) {
            return { 'tab-alt--active': active };
        },
    },
};
</script>

<template>
    <CTabs>
        <CTabList aria-label="Example of tabs with different style">
            <CTab
                target="1"
                :classGenerator="getTabClass"
                class="btn tab-alt"
                bare
            >
                Tab 1
            </CTab>
            <CTab
                target="2"
                :classGenerator="getTabClass"
                class="btn tab-alt"
                bare
            >
                Tab 2
            </CTab>
        </CTabList>

        <CTabPanels>
            <CTabPanel id="1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laboriosam in, iste id nobis dolor excepturi dolore expedita
                vero quae. Nobis fuga cupiditate suscipit blanditiis.
            </CTabPanel>
            <CTabPanel id="2">
                Nobis fuga cupiditate suscipit blanditiis, aliquid minima harum
                molestias pariatur tempora ab, libero quo maiores sapiente
                doloribus nihil commodi eaque accusantium praesentium!
            </CTabPanel>
        </CTabPanels>
    </CTabs>
</template>
};
```
