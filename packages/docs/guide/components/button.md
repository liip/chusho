# Button

Uniformized button style for `router-link`, `nuxt-link`, `a` or `button` elements.

```vue
<CBtn>Submit</CBtn>
```

## Config

### defaultClass

- **type:** `string`

Class applied to all CBtn components.

### disabledClass

- **type:** `string`

Class applied to Btn when prop `disabled` is set to `true`.

### variants

- **type:** `object`

Predefined set of styling variants.

For example:

```js
{
  primary: 'bg-blue-500 text-white rounded',
  large: 'btn--large',
  block: 'w-full',
}
```

## API

<Docgen :components="['CBtn']" />

## Examples

### As link

Transform the button tag into an `a` by providing the `href` prop.

```vue
<CBtn href="#">Click me</CBtn>
```

You can also make it a `router-link` (or `nuxt-link` in a Nuxt app, this will be detected automatically), by providing the `to` prop. It works just like `router-link` prop of the same name.

```vue
<CBtn to="/">Go home</CBtn>
```

::: warning
When a button is rendered as a link (i.e. an `a` tag), it will not apply the `type` nor the `disabled` prop as they aren't valid attributes for such HTML tag.
:::

### Type Submit

Change the type of the button so it can trigger the submit of a form.

```vue
<CBtn type="submit">Click me</CBtn>
```

### With style variant

Apply one or multiple pre-defined styling variants (separated by a space) defined in the component config.

```vue
<CBtn variant="default medium">Click me</CBtn>
```

### Disabled

Just like a normal button, you can disabled it.

```vue
<CBtn disabled>Click me</CBtn>
```

::: warning
This prop has no effect when used in combination with either `href` or `to` props.
:::

### Attributes and events

Any extra attribute or event listener will be forwared to the main element.

```vue
<CBtn id="pick-color-btn" @click="() => {}">
  Click me
</CBtn>
```
