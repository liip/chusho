# Icon

Display a scalable SVG icon from a pre-existing sprite.

```vue
<CIcon id="palette" />
```

## Config

### spriteUrl

-   **type:** `string`

Load the sprite from a remote URL. This technique doesn’t work on Internet Explorer, but it can be polyfilled with [svgxuse](https://github.com/Keyamoon/svgxuse). Learn more about [SVG Sprites](https://css-tricks.com/svg-sprites-use-better-icon-fonts/) on CSS-Tricks.

### width

-   **type:** `number`
-   **default:** `24`

### height

-   **type:** `number`
-   **default:** `24`

Icon viewBox height.

### class

-   **type:** `string`

Class applied to all Icon instances.

## API

<Docgen :components="['CIcon']" />

## Examples

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
