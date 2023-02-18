# FormGroup

Context provider and optional layouting element for form fields.

Automatically pairs the label (for) with the field (id) using a randomly generated ID.

<showcase-root>
    <CFormGroup as="div" class="flex flex-col gap-1" v-slot="{ ids }" required>
        <CLabel>
            Label <abbr title="Required" aria-label="Required">*</abbr>
        </CLabel>
        <CTextField :aria-describedby="ids.help" />
        <div :id="ids.help" class="text-gray-600 text-sm">Help text</div>
    </CFormGroup>
</showcase-root>

## Usage

See [using components](/guide/using-components) for detailed instructions.

```js
import { CFormGroup } from 'chusho';
```

## Config

The options below are to be set in the [global configuration](/guide/config.html) at the following location:

```js
{
  components: {
    formGroup: {
      as: '',
      class: ({ as, required, disabled, readonly, variant }) => {},
    },
  },
}
```

### as

Define the type of HTML element it should be rendered as.

- **type:** `String`
- **default:** `null` (renderless)

:::: warning
It’s recommended to specify a value when using server-side rendering (SSR), especially if you render components conditionally within the form group, as it can result in IDs pairing mismatches.
::::

#### Example

```js
as: 'div',
```

### class

Classes applied to the root element, except when the prop `bare` is set to `true`. See [styling components](/guide/styling-components).

- **type:** `Array<String | Object> | Object | String | (props: Object) => {}`
- **default:** `null`

:::: warning
Since this component is renderless by default, classes won’t be applied. You need to define the `as` option above or set the component `as` prop to render an element on which classes will be applied.
::::

#### Example

```js
class({ required, disabled }) {
    return ['form-group', {
        'form-group--required': required,
        'form-group--disabled': disabled
    }]
}
```

## API

<Docgen :components="['CFormGroup']" />

## Examples

### Renderless

By default, CFormGroup is renderless, which means it doesn’t create any HTML element. It only renders it’s children.

```vue-html
<CFormGroup required>
  <CLabel>Label</CLabel>
  <CTextField />
</CFormGroup>
```

The code above will output this:

```html
<!--[-->
<label for="chusho-field-{uid}" id="chusho-label-{uid}">Label</label>
<input type="text" id="chusho-field-{uid}" required />
<!--]-->
```

Notice how the `required` prop set on the CFormGroup was added to the input automatically.

### As element

You can force it to render the element of your choice using the `as` prop (or set a default value in the config, so it always render one; see [config](#config) above).

```vue-html
<CFormGroup as="div" class="form-group" disabled>
  <CLabel>Label</CLabel>
  <CTextField />
</CFormGroup>
```

The code above will output this:

```html
<div class="form-group">
  <label for="chusho-field-{uid}" id="chusho-label-{uid}">Label</label>
  <input type="text" id="chusho-field-{uid}" disabled />
</div>
```

### Using slot scope

Flags are accessible in the default slot scope, allowing you to render other elements conditionaly based on them:

```vue-html
<CFormGroup v-slot="{ required }" :required="someVariableOnYourComponent">
  <CLabel>
    Label <abbr v-if="required" title="Required" aria-label="Required">*</abbr>
  </CLabel>
  <CTextField />
</CFormGroup>
```

### Using ids generator for extra elements

Label and field are automatically linked together by default. Here we use the `ids` generator provided by the form group to generate an extra id to describe the field with an additional help text.

```vue-html
<CFormGroup v-slot="{ ids }">
  <CLabel>Password</CLabel>
  <CTextField type="password" :aria-describedby="ids.help" />
  <div :id="ids.help">Help text describing the field expected value.</div>
</CFormGroup>
```

The code above will output this:

```html
<!--[-->
<label for="chusho-field-{uid}" id="chusho-label-{uid}">Password</label>
<input
  type="password"
  id="chusho-field-{uid}"
  aria-describedby="chusho-help-{uid}"
/>
<div id="chusho-help-{uid}">Help text describing the field expected value.</div>
<!--]-->
```

### Nested

You shouldn’t have multiple labels or fields in a single CFormGroup. When you want to group related fields, like checkboxes or radios, you should give each field its own CFormGroup.

```vue
<template>
  <!-- The `required` flag will be applied on all checkboxes -->
  <CFormGroup v-slot="{ ids }" required>
    <CLabel>Fruits</CLabel>
    <!-- Label the group of checkboxes with the CLabel value above -->
    <ul :aria-labelledby="ids.label">
      <CFormGroup v-for="fruit in fruits" :key="fruit" as="li">
        <CLabel>
          <CCheckbox v-model="state[fruit]" />
          {{ fruit }}
        </CLabel>
      </CFormGroup>
    </ul>
  </CFormGroup>
</template>

<script setup>
import { reactive } from 'vue';

const fruits = ['banana', 'apple', 'kiwi'];
const state = reactive({
  banana: true,
  apple: false,
  kiwi: false,
});
</script>
```
