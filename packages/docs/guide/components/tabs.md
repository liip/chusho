# Tabs

Accessible tabs component.

<showcase-root>
   <CTabs default-tab="1">
      <CTabList>
        <CTab target="1">First</CTab>
        <CTab target="2">Second</CTab>
        <CTab target="3">Third</CTab>
      </CTabList>
      <CTabPanels>
        <CTabPanel id="1">
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                tenetur accusantium nemo assumenda consectetur nobis minima quos
                ducimus voluptatem quo culpa eaque quae aperiam eligendi asperiores
                nihil vitae quod amet natus, iste distinctio et cupiditate obcaecati.
                Ipsa accusantium saepe possimus.
            </p>
        </CTabPanel>
        <CTabPanel id="2">
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit
                blanditiis quae voluptates perferendis, nostrum quo velit veritatis
                nam, culpa maiores, repudiandae ratione ea repellat eos itaque vel
                pariatur nobis porro minus. Voluptatum excepturi perspiciatis fugiat
                ullam, veritatis harum necessitatibus officia.
            </p>
        </CTabPanel>
        <CTabPanel id="3">
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia rem
                dicta error, recusandae eligendi numquam facere? Exercitationem facere
                nihil animi repudiandae repellendus cum! Asperiores labore, omnis
                laudantium optio, nobis expedita eveniet aspernatur ipsa, hic iusto
                repellendus consequatur necessitatibus porro eligendi.
            </p>
        </CTabPanel>
      </CTabPanels>
    </CTabs>
</Showcase>

## Config

The options below are to be set in the [global configuration](/guide/config.html) at the following location:

```js
{
    components: {
        tabs: { ... },
        tabList: { ... },
        tab: { ... },
        tabPanels: { ... },
        tabPanel: { ... },
    },
}
```

### All components

#### class

Classes applied to the component root element, except when the prop `bare` is set to `true`. See [styling components](/guide/styling-components).

- **type:** `Array<String | Object> | Object | String | (props: Object) => {}`
- **default:** `null`

##### Example

Using the `CTab` component:

```js
class({ active }) {
    return ['tab', {
        'tab--active': active,
    }]
}
```

## API

<Docgen :components="['CTabs', 'CTabList', 'CTab', 'CTabPanels', 'CTabPanel']" />

## Examples

### Simplest

```vue-html
<CTabs default-tab="1">
  <CTabList aria-label="Example of tabs">
    <CTab target="1">Tab 1</CTab>
    <CTab target="2">Tab 2</CTab>
    <CTab target="3">Tab 3</CTab>
  </CTabList>

  <CTabPanels>
    <CTabPanel id="1">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam in,
        iste id nobis dolor excepturi dolore expedita vero quae. Nobis fuga
        cupiditate suscipit blanditiis, aliquid minima harum molestias pariatur
        tempora ab.
      </p>
    </CTabPanel>
    <CTabPanel id="2">
      <p>
        Nobis fuga cupiditate suscipit blanditiis, aliquid minima harum
        molestias pariatur tempora ab, libero quo maiores sapiente doloribus
        nihil commodi eaque accusantium praesentium! Nobis natus qui voluptate
        inventore molestias quisquam, consequuntur harum?
      </p>
    </CTabPanel>
    <CTabPanel id="3">
      <p>
        Laboriosam in, iste id nobis dolor excepturi dolore expedita vero quae.
        Nobis natus qui voluptate inventore molestias quisquam, consequuntur
        harum?
      </p>
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
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
          in, iste id nobis dolor excepturi dolore expedita vero quae. Nobis
          fuga cupiditate suscipit blanditiis, aliquid minima harum molestias
          pariatur tempora ab.
        </p>
      </CTabPanel>
      <CTabPanel id="2">
        <p>
          Nobis fuga cupiditate suscipit blanditiis, aliquid minima harum
          molestias pariatur tempora ab, libero quo maiores sapiente doloribus
          nihil commodi eaque accusantium praesentium! Nobis natus qui voluptate
          inventore molestias quisquam, consequuntur harum?
        </p>
      </CTabPanel>
    </CTabPanels>
  </CTabs>
</template>
```
