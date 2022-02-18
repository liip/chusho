# TextField

Augmented form field for text input.

<Showcase>
    <CTextField placeholder="Type here…" />
</Showcase>

## Config

The options below are to be set in the [global configuration](/guide/config.html) at the following location:

```js
{
  components: {
    textField: { ... },
  },
}
```

### class

Classes applied to the input element, except when the prop `bare` is set to `true`. See [styling components](/guide/styling-components/).

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

### Simplest

```vue:no-line-numbers
<CTextField v-model="value" />
```

### With type

```vue:no-line-numbers
<CTextField v-model="value" type="email" />
```
