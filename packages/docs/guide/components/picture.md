# Picture

Easily generate responsive images.

<Sandbox id="cpicture-w5gt6" />

## Config

### class

Classes applied to the component `img` element, except when the prop `bare` is set to `true`. See [styling components](/guide/styling-components/).

-   **type:** `Array<String | Object> | Object | String | (props: Object) => {}`
-   **default:** `null`

#### Example

```js
class: 'img-responsive'
```

## API

<Docgen :components="['CPicture']" />

## Examples

### Simplest

```vue
<CPicture src="/path/to/image.jpg" />
```

### With sources

```vue
<CPicture
    :src="src"
    :sources="[
        {
            srcset: '/path/to/image@2x.webp 2x, /path/to/image.webp',
            type: 'image/webp',
        },
        {
            srcset: '/path/to/image@2x.jpg 2x, /path/to/image.jpg',
            type: 'image/jpeg',
        },
    ]"
/>
```

### With additional attributes

Attributes are not applied to the `picture` element but to the `img` element.

```vue
<CPicture src="/path/to/image.jpg" alt="Description" loading="lazy" />
```
