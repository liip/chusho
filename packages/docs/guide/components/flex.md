# Flex

Layout content in rows or columns responsively.

```vue live
<CFlex gap="2">
  <CFlexItem width="1/3">
    <div class="placeholder">1</div>
  </CFlexItem>
  <CFlexItem width="1/3">
    <div class="placeholder">2</div>
  </CFlexItem>
  <CFlexItem width="1/3">
    <div class="placeholder">3</div>
  </CFlexItem>
  <CFlexItem :width="{ md: '2/3' }">
    <div class="placeholder">4</div>
  </CFlexItem>
  <CFlexItem :width="{ md: '1/3' }">
    <div class="placeholder">5</div>
  </CFlexItem>
  <CFlexItem :width="{ sm: '1/3', lg: '1/2' }">
    <div class="placeholder">6</div>
  </CFlexItem>
  <CFlexItem :width="{ sm: '1/3', lg: '1/2' }">
    <div class="placeholder">7</div>
  </CFlexItem>
</CFlex>
```

::: tip
The `<div class="placeholder">…</div>` you see in the examples are here for you to better understand how content is laid out. You should not include those when using the components.
:::

## Config

### containerClass

- **type:** `string`

Classes to apply to all Flex containers.

### itemClass

- **type:** `string`

Classes to apply to all Flex items.

### gaps

- **type:** `object`

List of available gaps by axis. The object key (`1`, `2` in the example below) is the gap id you’ll reference in the Flex component `gap` prop to apply the corresponding classes.

Here’s an example using numbers as gap ids, but it can also be strings like `xs`, `sm`, …

```js
{
  x: {
    1: {
      containerClass: '-ml-1',
      itemClass: 'pl-1'
    },
    2: {
      containerClass: '-ml-2',
      itemClass: 'pl-2'
    }
  },
  y: {
    1: {
      containerClass: '-mt-1',
      itemClass: 'pt-1'
    },
    2: {
      containerClass: '-mt-2',
      itemClass: 'pt-2'
    }
  }
}
```

### widths

- **type:** `object`

List of widths/classes pair CFlexItem will apply based on its `width` prop.

For example:

```js
{
  '1/2': 'w-1/2',
  '1/3': 'w-1/3',
}
```

### defaultWidth

- **type:** `string`

When creating grids, you usually want items to take the whole width available when it isn’t specified otherwise. Some CSS frameworks requires this to be set explicitely, for example Tailwind wants a `w-full` class on each item. But specifying this value on every of them can be quite cumbersome, ence this setting that will automatically apply the given class on every item without an explicit `default` width.

### responsiveWidthGenerator

- **type:** `function`
- **default:**
  ```js
  (breakpoint, width) => `${breakpoint}:${width}`;
  ```

Control how Flex items responsive classes are generated.

For example, with the following widths defined in the config:

```js
flex: {
  widths: {
    '1/2': 'w-1/2'
  }
}
```

The following Flex item:

```vue
<CFlexItem :width="{ sm: '1/2' }"></CFlexItem>
```

will get the class `sm:w-1/2`.

## API

<Docgen :components="['CFlex', 'CFlexItem']" />

## Examples

### Different gap by axis

Apply a different spacing value between columns and rows.

```vue live
<CFlex :gap="[3, 6]">
  <CFlexItem width="1/3">
    <div class="placeholder">1</div>
  </CFlexItem>
  <CFlexItem width="1/3">
    <div class="placeholder">2</div>
  </CFlexItem>
  <CFlexItem width="1/3">
    <div class="placeholder">3</div>
  </CFlexItem>
  <CFlexItem :width="{ md: '2/3', lg: '1/2' }">
    <div class="placeholder">4</div>
  </CFlexItem>
  <CFlexItem :width="{ md: '1/3', lg: '1/2' }">
    <div class="placeholder">5</div>
  </CFlexItem>
</CFlex>
```

### Stack

Stack items on each other with a common spacing in-between.

```vue live
<CFlex gap="3">
  <CFlexItem>
    <div class="placeholder">1</div>
  </CFlexItem>
  <CFlexItem>
    <div class="placeholder">2</div>
  </CFlexItem>
  <CFlexItem>
    <div class="placeholder">3</div>
  </CFlexItem>
</CFlex>
```

::: tip
You can apply different spacing between group of items by nesting multiple Flex components.
:::

### Inline

```vue live
<CFlex gap="2">
  <CFlexItem width="auto">
    <div class="placeholder">Alice Blue</div>
  </CFlexItem>
  <CFlexItem width="auto">
    <div class="placeholder">Antique White</div>
  </CFlexItem>
  <CFlexItem width="auto">
    <div class="placeholder">Aqua</div>
  </CFlexItem>
  <CFlexItem width="auto">
    <div class="placeholder">Aquamarine</div>
  </CFlexItem>
  <CFlexItem width="auto">
    <div class="placeholder">Azure</div>
  </CFlexItem>
  <CFlexItem width="auto">
    <div class="placeholder">Beige</div>
  </CFlexItem>
  <CFlexItem width="auto">
    <div class="placeholder">Bisque</div>
  </CFlexItem>
  <CFlexItem width="auto">
    <div class="placeholder">Black</div>
  </CFlexItem>
</CFlex>
```

### Nested

Nest multiple Flex components for complex layouts and even more flexibility.

```vue live
<CFlex gap="8">
  <CFlexItem width="1/2">
    <CFlex gap="2">
      <CFlexItem>
        <div class="placeholder">Column 1, item 1</div>
      </CFlexItem>
      <CFlexItem>
        <div class="placeholder">Column 1, item 2</div>
      </CFlexItem>
    </CFlex>
  </CFlexItem>
  <CFlexItem width="1/2">
    <div class="placeholder">Column 2</div>
  </CFlexItem>
</CFlex>
```
