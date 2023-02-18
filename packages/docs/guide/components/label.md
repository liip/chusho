# Label

Just like a regular `<label />`

<showcase-root>
    <CLabel>
        I’m a label!
    </CLabel>
</showcase-root>

## Usage

See [using components](/guide/using-components) for detailed instructions.

```js
import { CLabel } from 'chusho';
```

## Config

The options below are to be set in the [global configuration](/guide/config.html) at the following location:

```js
{
  components: {
    label: {
      class: ({ variant }) => {},
    },
  },
}
```

### class

Classes applied to the label element, except when the prop `bare` is set to `true`. See [styling components](/guide/styling-components).

- **type:** `Array<String | Object> | Object | String | (props: Object) => {}`
- **default:** `null`

#### Example

```js
class: 'label'
```

## API

<Docgen :components="['CLabel']" />

## Examples

### Simplest

```vue-html
<CLabel>Label</CLabel>
```

### Linked to a field

```vue-html
<CLabel for="the-field">
  <CCheckbox id="the-field" /> Something labelling the checkbox
</CLabel>
```
