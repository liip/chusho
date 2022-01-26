# Button

Uniformized button style for `router-link`, `a` or `button` elements.

<Showcase>
    <div class="space-y-6">
        <div class="space-x-4">
            <CBtn>Primary</CBtn>
            <CBtn disabled>Primary disabled</CBtn>
        </div>
        <div class="space-x-4">
            <CBtn variant="secondary">Secondary</CBtn>
            <CBtn variant="secondary" disabled>
            Secondary disabled
            </CBtn>
        </div>
        <div class="space-x-4">
            <CBtn href="#" variant="link">
            Link
            </CBtn>
        </div>
    </div>
</Showcase>

## Config

The options below are to be set in the [global configuration](/guide/config.html) at the following location:

```js
{
  components: {
    btn: { ... },
  },
}
```

### class

Classes applied to the component root element, except when the prop `bare` is set to `true`. See [styling components](/guide/styling-components/).

- **type:** `Array<String | Object> | Object | String | (props: Object) => {}`
- **default:** `null`

#### Example

```js
class({ variant, disabled }) {
    return ['btn', {
        'btn--default': !variant,
        'btn--primary': variant?.includes('primary'),
        'btn--block': variant?.includes('block'),
        'btn--disabled': disabled
    }]
}
```

## API

<Docgen :components="['CBtn']" />

## Examples

### Simplest

```vue:no-line-numbers
<CBtn>Click me</CBtn>
```

### With variant

```vue:no-line-numbers
<CBtn variant="secondary">Click me</CBtn>
```

### As link

Transform the button tag into an `a` by providing the `href` prop.

```vue:no-line-numbers
<CBtn href="#">Click me</CBtn>
```

You can also make it a `router-link`, by providing the `to` prop. It works just like `router-link` prop of the same name.

```vue:no-line-numbers
<CBtn to="/">Go home</CBtn>
```

::: warning
When a button is rendered as a link (i.e. an `a` element), it will not apply the `type` nor the `disabled` props as they aren’t valid attributes for this HTML element.
:::

### Type Submit

Change the type of the button so it can trigger the submit of a form.

```vue:no-line-numbers
<CBtn type="submit">Click me</CBtn>
```

### Disabled

Just like a normal button, you can disable it.

```vue:no-line-numbers
<CBtn disabled>Click me</CBtn>
```

::: warning
This prop has no effect when used in combination with either `href` or `to` props.
:::

### Attributes and events

Any extra attribute or event listener will be forwarded to the main element.

```vue
<CBtn id="pick-color-btn" @click="() => {}">
  Click me
</CBtn>
```
