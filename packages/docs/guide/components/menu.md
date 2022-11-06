# Menu

Accessible dropdown menu. Can be used as a list of buttons, links, checkboxes or radios.

<Showcase>
    <div class="flex gap-4">
        <CMenu v-slot="{ open }">
            <CMenuBtn>
            <span>Actions</span>
            <CIcon
                id="caret"
                :scale="0.75"
                class="ml-3 transition-transform"
                :class="{ 'transform rotate-180': open }"
            />
            </CMenuBtn>
            <CMenuList>
            <CMenuItem>Edit profile</CMenuItem>
            <CMenuItem>Account settings</CMenuItem>
            <CMenuSeparator />
            <CMenuItem>Log out</CMenuItem>
            </CMenuList>
        </CMenu>
        <CMenu v-slot="{ open }">
            <CMenuBtn>
            <span>Radios</span>
            <CIcon
                id="caret"
                :scale="0.75"
                class="ml-3 transition-transform"
                :class="{ 'transform rotate-180': open }"
            />
            </CMenuBtn>
            <CMenuList>
            <CMenuItem value="r">Red</CMenuItem>
            <CMenuItem value="g">Green</CMenuItem>
            <CMenuItem value="b">Blue</CMenuItem>
            </CMenuList>
        </CMenu>
        <CMenu v-slot="{ open }" multiple>
            <CMenuBtn>
            <span>Checkboxes</span>
            <CIcon
                id="caret"
                :scale="0.75"
                class="ml-3 transition-transform"
                :class="{ 'transform rotate-180': open }"
            />
            </CMenuBtn>
            <CMenuList>
            <CMenuItem value="r">Red</CMenuItem>
            <CMenuItem value="g">Green</CMenuItem>
            <CMenuItem value="b">Blue</CMenuItem>
            </CMenuList>
        </CMenu>
    </div>
</Showcase>

## Config

The options below are to be set in the [global configuration](/guide/config.html) at the following location:

```js
{
    components: {
        menu: {
            class: ({ open }) => {},
        },
        menuBtn: {
            class: ({ disabled, active }) => {},
        },
        menuList: {
            class: () => {},
            transition: {},
        },
        menuItem: {
            class: ({ role, selected }) => {},
        },
        menuLink: {
            class: () => {},
        },
        menuSeparator: {
            class: () => {},
        },
    },
}
```

### All components

#### class

Classes applied to the component root element, except when the prop `bare` is set to `true`. See [styling components](/guide/styling-components/).

- **type:** `Array<String | Object> | Object | String | (props: Object) => {}`
- **default:** `null`

##### Example

Using the `CMenuItem` component:

```js
class({ role, selected }) {
    return ['menu-item', {
        'menu-item--selected': selected,
        'menu-item--checkbox': role === 'menuitemcheckbox',
        'menu-item--radio': role === 'menuitemradio',
    }]
}
```

### CMenuList

#### transition

Apply a common transition to all menu lists. The object can contain any Vue built-in [transition component props](https://v3.vuejs.org/api/built-in-components.html#transition).

- **type:** `object`
- **default:** `null`

##### Example

```js
{ name: 'fade', mode: 'out-in' }
```

## API

<Docgen :components="[
  'CMenu',
  'CMenuBtn',
  'CMenuList',
  'CMenuItem',
  'CMenuLink',
  'CMenuSeparator',
]" />

## Examples

### Simplest

Manually handle the item behavior using the `select` event.

```vue-html
<CMenu>
  <CMenuBtn>Toggle menu</CMenuBtn>
  <CMenuList>
    <CMenuItem @select="() => { /* Do something */ }">Item 1</CMenuItem>
    <CMenuItem @select="() => { /* Do something */ }">Item 2</CMenuItem>
  </CMenuList>
</CMenu>
```

### With router links

Navigate to the given route. You can replace `to` by `href` for regular links.

```vue-html
<CMenu>
  <CMenuBtn>Toggle menu</CMenuBtn>
  <CMenuList>
    <CMenuLink to="/url-1">Link 1</CMenuLink>
    <CMenuLink to="/url-2">Link 2</CMenuLink>
  </CMenuList>
</CMenu>
```

### Selectable

Let the user select one of the items and update the `v-model` accordingly.

```vue
<template>
  <CMenu v-model="value">
    <CMenuBtn>Choose your weapon</CMenuBtn>
    <CMenuList>
      <CMenuItem
        v-for="item in items"
        :key="item.value"
        :value="item.id"
        :disabled="item.disabled"
      >
        {{ item.label }}
      </CMenuItem>
    </CMenuList>
  </CMenu>
</template>

<script setup>
import { ref } from 'vue';

const value = ref(null);
const items = [
  {
    label: 'Banana',
    id: 1,
  },
  {
    label: 'Apple',
    id: 2,
  },
  {
    label: 'Bananapple',
    id: 3,
    disabled: true,
  },
];
</script>
```

### Multi selectable

Let the user select many items and update the `v-model` accordingly. In this scenario the value must be an array.

```vue
<template>
  <CMenu v-model="value" multiple>
    <CMenuBtn>Choose your weapons</CMenuBtn>
    <CMenuList>
      <CMenuItem
        v-for="item in items"
        :key="item.value"
        :value="item.id"
        :disabled="item.disabled"
      >
        {{ item.label }}
      </CMenuItem>
    </CMenuList>
  </CMenu>
</template>

<script setup>
import { ref } from 'vue';

const value = ref([]);
const items = [
  {
    label: 'Banana',
    id: 1,
  },
  {
    label: 'Apple',
    id: 2,
  },
  {
    label: 'Bananapple',
    id: 3,
    disabled: true,
  },
];
</script>
```
