# Button

Uniformized button style for `router-link`, `a` or `button` elements.

<showcase-root>
    <div class="flex flex-col gap-4">
        <div class="flex flex-wrap gap-x-6 gap-y-2">
            <CBtn>Primary</CBtn>
            <CBtn disabled>Primary disabled</CBtn>
        </div>
        <div class="flex flex-wrap gap-x-6 gap-y-2">
            <CBtn variant="secondary">Secondary</CBtn>
            <CBtn variant="secondary" disabled>Secondary disabled</CBtn>
        </div>
        <div class="flex flex-wrap gap-x-6 gap-y-2">
            <CBtn href="#" variant="link">
            Link
            </CBtn>
        </div>
    </div>
</showcase-root>

## Usage

See [using components](/guide/using-components) for detailed instructions.

```js
import { CBtn } from 'chusho';
```

## Config

The options below are to be set in the [global configuration](/guide/config.html) at the following location:

```js
{
  components: {
    btn: {
      class: ({ href, to, type, disabled, active, variant }) => {},
    },
  },
}
```

### class

Classes applied to the component root element, except when the prop `bare` is set to `true`. See [styling components](/guide/styling-components).

- **type:** `Array<String | Object> | Object | String | (props: Object) => {}`
- **default:** `null`

#### Example

```js
class({ variant, disabled }) {
    return ['btn', {
        'btn--default': !variant,
        'btn--primary': variant?.primary,
        'btn--block': variant?.block,
        'btn--disabled': disabled
    }]
}
```

## API

<Docgen :components="['CBtn']" />

## Examples

### Simplest

```vue-html
<CBtn>Click me</CBtn>
```

### With variant

```vue-html
<CBtn variant="secondary">Click me</CBtn>
```

### As link

Transform the button tag into an `a` by providing the `href` prop.

```vue-html
<CBtn href="#">Click me</CBtn>
```

You can also make it a `router-link`, by providing the `to` prop. It works just like `router-link` prop of the same name.

```vue-html
<CBtn to="/">Go home</CBtn>
```

::: warning
When a button is rendered as a link (i.e. an `a` element), it will not apply the `type` nor the `disabled` props as they aren’t valid attributes for this HTML element.
:::

### Type Submit

Change the type of the button so it can trigger the submit of a form.

```vue-html
<CBtn type="submit">Click me</CBtn>
```

### Disabled

Just like a normal button, you can disable it.

```vue-html
<CBtn disabled>Click me</CBtn>
```

::: warning
This prop has no effect when used in combination with either `href` or `to` props.
:::

### Attributes and events

Any extra attribute or event listener will be forwarded to the main element.

```vue-html
<CBtn id="pick-color-btn" @click="() => {}">
  Click me
</CBtn>
```
