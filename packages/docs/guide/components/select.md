# Select

Implements the select-only variant of the [combobox design pattern](https://w3c.github.io/aria-practices/#combobox), allowing the user to select an option from a collection of predefined values.

<Showcase>
    <ExampleSelect />
</Showcase>

## Usage

See [using components](/guide/using-components) for detailed instructions.

```js
import {
  CSelect,
  CSelectBtn,
  CSelectGroup,
  CSelectGroupLabel,
  CSelectOption,
  CSelectOptions,
} from 'chusho';
```

## Config

The options below are to be set in the [global configuration](/guide/config.html) at the following location:

```js
{
  components: {
    select: {
      class: ({ open, modelValue, name, input, itemValue, disabled, variant }) => {},
    },
    selectBtn: {
      class: ({ active, disabled, variant }) => {},
    },
    selectGroup: {
      class: ({ variant }) => {},
    },
    selectGroupLabel: {
      class: ({ variant }) => {},
    },
    selectOption: {
      class: ({ selected, value, disabled, variant }) => {},
    },
    selectOptions: {
      class: ({ transition, variant }) => {},
      transition: {},
    },
  },
}
```

### class

Classes applied to the component root element, except when the prop `bare` is set to `true`. See [styling components](/guide/styling-components).

- **type:** `Array<String | Object> | Object | String | (props: Object) => {}`
- **default:** `null`

### transition

Apply a common transition to all CSelectOptions. The object can contain any Vue built-in [transition component props](https://v3.vuejs.org/api/built-in-components.html#transition).

- **type:** `object`
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
