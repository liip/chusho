# Icon

Display a scalable SVG icon from a pre-existing sprite.

<Showcase>
    <div class="max-w-md grid grid-cols-3 grid-rows-flow gap-8 items-center content-center justify-items-center">
        <CIcon id="cloud" class="text-purple-500 opacity-75" />
        <CIcon id="emoji-happy" :scale="1.5" class="text-purple-500" />
        <CIcon id="gift" class="text-indigo-500 opacity-75" />
        <CIcon id="heart" :scale="1.5" class="text-purple-500" />
        <CIcon id="music-note" :scale="2" class="text-indigo-500" />
        <CIcon id="sparkles" :scale="1.5" class="text-blue-500" />
        <CIcon id="thumb-up" class="text-indigo-500 opacity-75" />
        <CIcon id="star" :scale="1.5" class="text-blue-500" />
        <CIcon id="lightning-bolt" class="text-blue-500 opacity-75" />
    </div>
</Showcase>

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

- **type:** `string`
- **default:** `null`

### width

Icons viewBox width. This value will be multiplied by the `scale` prop to calculate the display size.

- **type:** `number`
- **default:** `24`

### height

Icons viewBox width. This value will be multiplied by the `scale` prop to calculate the display size.

- **type:** `number`
- **default:** `24`

### class

Classes applied to the component root element, except when the prop `bare` is set to `true`. See [styling components](/guide/styling-components/).

- **type:** `Array<String | Object> | Object | String | (props: Object) => {}`
- **default:** `null`

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

```vue:no-line-numbers
<CIcon id="sparkles" />
```

### Custom Scale

```vue:no-line-numbers
<CIcon id="cloud" :scale="2" />
```

### With Alternate Text

When used to depict an interactive element without any label close-by, use the alternate text to describe the action.

```vue
<CBtn variant="secondary">
  <CIcon id="thumb-up" alt="Like" />
</CBtn>
```
