# Radio

Augmented form field for choice input.

<Showcase>
    <ExampleRadio />
</Showcase>

## Config

The options below are to be set in the [global configuration](/guide/config.html) at the following location:

```js
{
  components: {
    radio: { ... },
  },
}
```

### class

Classes applied to the input element, except when the prop `bare` is set to `true`. See [styling components](/guide/styling-components/).

- **type:** `Array<String | Object> | Object | String | (props: Object) => {}`
- **default:** `null`

#### Example

```js
class({ checked }) {
    return ['radio', {
        'radio--checked': checked,
    }]
}
```

## API

<Docgen :components="['CRadio']" />

## Examples

### Controlled

```vue
<template>
  <CRadio v-model="value" value="A" />
  <CRadio v-model="value" value="B" />
  <CRadio v-model="value" value="C" />
</template>

<script>
export default {
  data() {
    return {
      value: null, // None by default
    };
  },
};
</script>
```
