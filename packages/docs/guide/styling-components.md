---
next: /guide/using-components.html
---

# Styling components

All components behaves the same:

- You can set the CSS classes to apply globally for each component in the config
- These classes can be static or conditional, based on the component props
- Classes defined globally can be extended or overrided locally

## Global classes in config

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

Here is an example using the CBtn `disabled` prop:

```js
components: {
    btn: {
        class({ disabled }) {
            return [
                'btn',
                {
                    'btn--disabled': disabled
                }
            ];
        }
    }
}
```

With the configuration above:

- `<CBtn />` will render `<button class="btn"></button>`
- `<CBtn disabled />` will render `<button class="btn btn--disabled"></button>`

#### Using variants to define multiple styles globally

Being able to apply classes globally is a great way to avoid repetitions in the code. But it’s common to have several styles for the same component. A popular example is buttons, where there is usually a _primary_ and _secondary_ style for example.

As these different buttons can be found all over a project, it’s also better to define these styles globally and then apply them as needed when using the component.

This is the purpose of the `variant`, a prop that exists on each and every Chūshō components. Its sole usage is to apply classes conditionally in the config.

The `variant` prop accepts the same type of values as the `class` binding in a Vue component:

```vue-html
<!-- No variant -->
<CBtn>Label</CBtn>

<!-- Single variant -->
<CBtn variant="primary">Label</CBtn>

<!-- Multiple variants separated by space -->
<CBtn variant="primary large">Label</CBtn>

<!-- Conditional variants -->
<CBtn :variant="['primary', { 'large': variable }]">Label</CBtn>
```

The variant is then available **as a normalized object** in the config, allowing you to apply classes conditionally:

```js
components: {
    btn: {
        class({ variant }) {
            // `variant` will either be:
            // - undefined if no variant is set
            // - an object of type { [variant]: true|false, ... } if at least one variant is set
            return [
                'btn',
                {
                    'btn--default': !variant,
                    // since `variant` could be `undefined` we need
                    // to check for its presence with optional chaining (?.)
                    // before accessing the `primary` key
                    'btn--primary': variant?.primary,
                    'btn--medium': !variant || variant?.primary,
                    'btn--large': variant?.large,
                }
            ];
        }
    }
}
```

::: warning
To simplify applying classes conditionally in the config, the `variant` prop is transformed and provided as an object of booleans to the class method, for example `{ primary: true, medium: true, large: false }`.

If no `variant` is given, the value stays `undefined`, it’s not transformed into an object.
:::

## Local classes in components

### Extending config

Like any element, you can define a class locally:

```vue-html
<CBtn class="btn--custom">Label</CBtn>
```

If it turns out that you also have classes defined globally in the config for this component (`btn` in this example), they will be **merged together**:

```html
<button class="btn btn--custom">Label</button>
```

### Overriding config

In case you need more control, you can **override the global classes** by passing the `bare` prop:

```vue-html
<CBtn class="custom-button" bare>Label</CBtn>
```

It will output only the locally defined classes:

```html
<button class="custom-button">Label</button>
```

::: tip
Just like `variant`, the `bare` prop exists on all components.
:::
