# Alert

Announce important messages.

<Showcase>
    <div class="space-y-4">
        <CAlert variant="error">
            <strong>Oops!</strong> Something went wrong.
        </CAlert>
        <CAlert variant="warning">
            <strong>Hey!</strong> You should pay attention to this message.
        </CAlert>
        <CAlert variant="success">
            <strong>Yay!</strong> Your message was sent.
        </CAlert>
        <CAlert variant="info">
            <strong>Hey!</strong> Did you know?
        </CAlert>
    </div>
</Showcase>

## Config

The options below are to be set in the [global configuration](/guide/config.html) at the following location:

```js
{
  components: {
    alert: { ... },
  },
}
```

### class

Classes applied to the component root element, except when the prop `bare` is set to `true`. See [styling components](/guide/styling-components/).

- **type:** `Array<String | Object> | Object | String | (props: Object) => {}`
- **default:** `null`

#### Example

```js
class({ variant }) {
    return ['alert', {
        'alert--error': variant?.includes('error'),
        'alert--warning': variant?.includes('warning'),
    }]
}
```

## API

<Docgen :components="['CAlert']" />

## Examples

### Simplest

```vue:no-line-numbers
<CAlert>An important message.</CAlert>
```

### With variant

```vue:no-line-numbers
<CAlert variant="error">An important message.</CAlert>
```
