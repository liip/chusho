# Checkbox

Augmented form field for boolean input.

<Showcase>
    <ExampleCheckbox />
</Showcase>

## Usage

See [using components](/guide/using-components) for detailed instructions.

```js
import { CCheckbox } from 'chusho';
```

## Config

The options below are to be set in the [global configuration](/guide/config.html) at the following location:

```js
{
  components: {
    checkbox: {
      class: ({ checked, required, disabled, modelValue, trueValue, falseValue, variant }) => {},
    },
  },
}
```

### class

Classes applied to the input element, except when the prop `bare` is set to `true`. See [styling components](/guide/styling-components).

- **type:** `Array<String | Object> | Object | String | (props: Object) => {}`
- **default:** `null`

#### Example

```js
class({ checked }) {
    return ['checkbox', {
        'checkbox--checked': checked,
    }]
}
```

## API

<Docgen :components="['CCheckbox']" />

## Examples

### Controlled

```vue
<template>
  <CCheckbox v-model="value" />
</template>

<script>
export default {
  data() {
    return {
      value: true, // Checked by default
    };
  },
};
</script>
```

### Controlled with custom values

```vue
<template>
  <CCheckbox v-model="value" trueValue="on" falseValue="off" />
</template>

<script>
export default {
  data() {
    return {
      value: 'off', // Unchecked by default
    };
  },
};
</script>
```
