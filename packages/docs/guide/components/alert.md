# Alert

Announce important messages.

<showcase-root>
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
</showcase-root>

## Usage

See [using components](/guide/using-components) for detailed instructions.

```js
import { CAlert } from 'chusho';
```

## Config

The options below are to be set in the [global configuration](/guide/config.html) at the following location:

```js
{
  components: {
    alert: {
      class: ({ variant }) => {},
    },
  },
}
```

### class

Classes applied to the component root element, except when the prop `bare` is set to `true`. See [styling components](/guide/styling-components).

- **type:** `Array<String | Object> | Object | String | (props: Object) => {}`
- **default:** `null`

#### Example

```js
class({ variant }) {
    return ['alert', {
        'alert--error': variant?.error,
        'alert--warning': variant?.warning,
    }]
}
```

## API

<Docgen :components="['CAlert']" />

## Examples

### Simplest

```vue-html
<CAlert>An important message.</CAlert>
```

### With variant

```vue-html
<CAlert variant="error">An important message.</CAlert>
```
