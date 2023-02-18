# TextField

Augmented form field for text input.

<Showcase>
    <CTextField placeholder="Type here…" />
</Showcase>

## Usage

See [using components](/guide/using-components) for detailed instructions.

```js
import { CTextField } from 'chusho';
```

## Config

The options below are to be set in the [global configuration](/guide/config.html) at the following location:

```js
{
  components: {
    textField: {
      class({ required, disabled, readonly, type, modelValue, variant }) => {},
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
class({ type }) {
    return ['field', `field--${type}`]
}
```

## API

<Docgen :components="['CTextField']" />

## Examples

### Controlled

```vue
<template>
  <CTextField v-model="value" />
</template>

<script>
export default {
    data() {
        return {
            value: 'Default value',
        },
    },
}
</script>
```

### With type

```vue
<template>
  <CTextField v-model="value" type="email" />
</template>

<!-- ... -->
```
