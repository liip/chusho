# Label

Just like a regular `<label />`

<Showcase>
    <CLabel>
        I’m a label!
    </CLabel>
</Showcase>

## Config

The options below are to be set in the [global configuration](/guide/config.html) at the following location:

```js
{
  components: {
    label: { ... },
  },
}
```

### class

Classes applied to the label element, except when the prop `bare` is set to `true`. See [styling components](/guide/styling-components/).

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

```vue
<CLabel>Label</CLabel>
```

### Linked to a field

```vue
<CLabel for="the-field">
  <CCheckbox id="the-field" /> Something labelling the checkbox
</CLabel>
```
