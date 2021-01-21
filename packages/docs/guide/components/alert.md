# Alert

Announce important messages.

<Sandbox id="calert-3j3ve" />

## Config

The options below are to be set in the [global configuration](/guide/config.html) at the following location:

```js
{
    components: {
        picture: {
            // ...
        }
    }
}
```

### class

Classes applied to the component root element, except when the prop `bare` is set to `true`. See [styling components](/guide/styling-components/).

-   **type:** `Array<String | Object> | Object | String | (props: Object) => {}`
-   **default:** `null`

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

```vue
<CAlert>An important message.</CAlert>
```

### With variant

```vue
<CAlert variant="error">An important message.</CAlert>
```
