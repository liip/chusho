# Alert

Announce important messages.

```vue live
<CAlert>An important message.</CAlert>
```

## Config

### defaultClass

- **type:** `string`

Class applied to all CAlert components.

### variants

- **type:** `object`

Predefined set of styling variants.

For example:

```js
{
  error: 'bg-red-200 text-red-900',
  warning: 'bg-orange-200 text-orange-900',
  success: 'bg-success-200 text-success-900',
}
```

## API

<Docgen :components="['CAlert']" />

## Examples

### With style variant

Apply one or multiple pre-defined styling variants (separated by a space) defined in the component config.

```vue live
<CAlert variant="error">An important message.</CAlert>
```

```vue live
<CAlert variant="warning inline">An important inline message.</CAlert>
```
