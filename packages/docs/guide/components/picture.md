# Picture

Easily generate responsive images.

<Showcase>
    <CPicture
        src="https://images.unsplash.com/photo-1505178041309-ad46d2e4207b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&fit=crop&w=860&h=400&q=80"
        alt="Ceiling view of the yellow triangular atrium of a building."
        width="860"
        height="400"
    />
</Showcase>

## Config

The options below are to be set in the [global configuration](/guide/config.html) at the following location:

```js
{
    components: {
        picture: { ... },
    },
}
```

### class

Classes applied to the component `img` element, except when the prop `bare` is set to `true`. See [styling components](/guide/styling-components/).

- **type:** `Array<String | Object> | Object | String | (props: Object) => {}`
- **default:** `null`

#### Example

```js
class: 'img-responsive'
```

## API

<Docgen :components="['CPicture']" />

## Examples

### Simplest

```vue-html
<CPicture src="/path/to/image.jpg" />
```

### With sources

```vue-html
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

```vue-html
<CPicture src="/path/to/image.jpg" alt="Description" loading="lazy" />
```
