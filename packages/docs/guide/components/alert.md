# Alert

Announce important messages.

```vue
<CAlert>An important message.</CAlert>
```

## Config

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

```vue
<CAlert variant="error">An important message.</CAlert>
```

```vue
<CAlert variant="warning">Another less important message.</CAlert>
```
