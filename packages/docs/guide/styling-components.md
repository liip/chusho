---
next: /guide/using-components.html
---

# Styling components

All components behaves the same:

- You can configure the CSS classes to apply globally for each component
- These classes can be static or conditional, based on the component props
- Classes defined globally can be extended or overrided locally

## Globally

::: tip NOTICE
The value returned by the `class` option must be a valid [Vue class binding](https://v3.vuejs.org/guide/class-and-style.html#binding-html-classes): Array, Object or String.
:::

### Static classes

Let’s say you want all your buttons to have a `btn` class. In the config, do:

```js
components: {
    btn: {
        class: 'btn',
    }
}
```

And now all your buttons got `class="btn"`.

### Dynamic classes

The `class` option can also be a function. It receive _all_ the component instance props as an Object, allowing you to conditionally apply classes.

Here is an example using the CBtn `variant` and `disabled` props:

```js
components: {
    btn: {
        class({ variant, disabled }) {
            // This method can return an Array of Strings and/or Objects, an Object or a String.
            return [
                'btn',
                {
                    'btn--default': !variant,
                    'btn--primary': variant?.includes('primary'),
                    'btn--disabled': disabled
                }
            ];
        }
    }
}
```

With the configuration above:

- `<CBtn />` will render `<button class="btn btn--default"></button>`
- `<CBtn variant="primary" />` will render `<button class="btn btn--primary"></button>`
- `<CBtn disabled />` will render `<button class="btn btn--default btn--disabled"></button>`
- `<CBtn variant="primary" disabled />` will render `<button class="btn btn--primary btn--disabled"></button>`

::: tip
The `variant` prop exists on all components.
:::

## Locally

### Extending

Like any element, you can define a class locally:

```vue:no-line-numbers
<CBtn class="btn--custom">Label</CBtn>
```

If it turns out that you also have classes defined globally in the config for this component (`btn` in this example), they will be **merged together**:

```html:no-line-numbers
<button class="btn btn--custom">Label</button>
```

### Overriding

In case you need more control, you can **override the global classes** by passing the `bare` prop:

```vue:no-line-numbers
<CBtn class="custom-button" bare>Label</CBtn>
```

It will output only the locally defined classes:

```html:no-line-numbers
<button class="custom-button">Label</button>
```

::: tip
The `bare` prop exists on all components.
:::
