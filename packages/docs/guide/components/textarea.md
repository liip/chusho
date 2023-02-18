# Textarea

Augmented textarea form field.

<showcase-root>
    <CTextarea placeholder="Type here…" />
</showcase-root>

## Usage

See [using components](/guide/using-components) for detailed instructions.

```js
import { CTextarea } from 'chusho';
```

## Config

The options below are to be set in the [global configuration](/guide/config.html) at the following location:

```js
{
  components: {
    textarea: {
      class({ required, disabled, readonly, modelValue, variant }) => {},
    },
  },
}
```

### class

Classes applied to the textarea element, except when the prop `bare` is set to `true`. See [styling components](/guide/styling-components).

- **type:** `Array<String | Object> | Object | String | (props: Object) => {}`
- **default:** `null`

#### Example

```js
class: 'field field--textarea'
```

## API

<Docgen :components="['CTextarea']" />

## Examples

### Controlled

```vue
<template>
  <CTextarea v-model="value" />
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
