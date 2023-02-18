# Select

Implements the [combobox design pattern](https://w3c.github.io/aria-practices/#combobox), allowing the user to select an option from a collection of predefined values.

<showcase-root>
    <ExampleSelect />
</showcase-root>

## Config

The options below are to be set in the [global configuration](/guide/config.html) at the following location:

```js
{
    components: {
        select: { ... },
        selectBtn: { ... },
        selectGroup: { ... },
        selectGroupLabel: { ... },
        selectOption: { ... },
        selectOptions: { ... },
    },
}
```

### All components

### class

Classes applied to the component root element, except when the prop `bare` is set to `true`. See [styling components](/guide/styling-components).

- **type:** `Array<String | Object> | Object | String | (props: Object) => {}`
- **default:** `null`

#### Example

Using the `CSelect` component:

```js
class({ open }) {
    return ['select', {
        'select--open': open,
    }]
}
```

## API

<Docgen :components="[
  'CSelect',
  'CSelectBtn',
  'CSelectOptions',
  'CSelectOption',
  'CSelectGroup',
  'CSelectGroupLabel',
]" />

## Examples

### Simplest

```vue
<template>
  <CSelect v-model="value">
    <CSelectBtn>
      {{ value.label }}
    </CSelectBtn>
    <CSelectOptions>
      <CSelectOption v-for="item in items" :value="item">
        {{ item.label }}
      </CSelectOption>
    </CSelectOptions>
  </CSelect>
</template>

<script>
export default {
  data() {
    return {
      value: null,
      items: [
        {
          label: 'AliceBlue',
          value: '#F0F8FF',
        },
        {
          label: 'AntiqueWhite',
          value: '#FAEBD7',
        },
        {
          label: 'Aqua',
          value: '#00FFFF',
        },
      ],
    };
  },
};
</script>
```
