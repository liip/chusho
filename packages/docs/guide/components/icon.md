# Icon

Display a scalable SVG icon from a pre-existing sprite.

<Sandbox id="cicon-dhc4r" />

## Config

The options below are to be set in the [global configuration](/guide/config.html) at the following location:

```js
{
    components: {
        icon: {
            // ...
        },
    }
}
```

### spriteUrl

Load the sprite from a remote URL. This technique doesn’t work on Internet Explorer, but it can be polyfilled with [svgxuse](https://github.com/Keyamoon/svgxuse). Learn more about [SVG Sprites](https://css-tricks.com/svg-sprites-use-better-icon-fonts/) on CSS-Tricks.

-   **type:** `string`
-   **default:** `null`

### width

Icons viewBox width. This value will be multiplied by the `scale` prop to calculate the display size.

-   **type:** `number`
-   **default:** `24`

### height

Icons viewBox width. This value will be multiplied by the `scale` prop to calculate the display size.

-   **type:** `number`
-   **default:** `24`

### class

Classes applied to the component root element, except when the prop `bare` is set to `true`. See [styling components](/guide/styling-components/).

-   **type:** `Array<String | Object> | Object | String | (props: Object) => {}`
-   **default:** `null`

#### Example

```js
class({ variant }) {
    return ['icon', {
        'icon--solid': variant?.includes('solid'),
        'icon--outline': variant?.includes('outline'),
    }]
}
```

## API

<Docgen :components="['CIcon']" />

## Examples

### Simplest

```vue
<CIcon id="palette" />
```

### Custom Scale

```vue
<CIcon id="picture" :scale="0.5" />
```

### With Alternate Text

When used to depict an interactive element without any label close-by, use the alternate text to describe the action.

```vue
<CBtn>
  <CIcon id="picture" alt="View larger picture" />
</CBtn>
```
