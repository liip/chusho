# Dialog

Display content in a modal dialog, on top of the page content.

<showcase-root>
    <ExampleDialog />
</showcase-root>

## Usage

See [using components](/guide/using-components) for detailed instructions.

```js
import { CDialog } from 'chusho';
```

## Config

The options below are to be set in the [global configuration](/guide/config.html) at the following location:

```js
{
  components: {
    dialog: {
      class: ({ modelValue, overlay, teleport, transition, variant }) => {},
      overlayClass: ({ modelValue, overlay, teleport, transition, variant }) => {},
      transition: {},
    },
  },
}
```

### class

Classes applied to the component dialog element, except when the prop `bare` is set to `true`. See [styling components](/guide/styling-components).

- **type:** `Array<String | Object> | Object | String | (props: Object) => {}`
- **default:** `null`

#### Example

```js
class({ variant }) {
    return ['dialog', {
        'dialog--large': variant?.large,
        'dialog--fullscreen': variant?.fullscreen,
    }]
}
```

### overlayClass

Classes applied to the component overlay element, except when the prop `bare` is set to `true`. See [styling components](/guide/styling-components).

The overlay is the element that contains the dialog, it’s usually covering the screen and clicking on it closes the dialog.

- **type:** `Array<String | Object> | Object | String | (props: Object) => {}`
- **default:** `null`

#### Example

```js
class: 'dialog-overlay'
```

### transition

Apply a common transition to all Dialogs. The object can contain any Vue built-in [transition component props](https://v3.vuejs.org/api/built-in-components.html#transition).

- **type:** `object`
- **default:** `null`

#### Example

```js
{ name: 'fade', mode: 'out-in' }
```

## API

<Docgen :components="['CDialog']" />

## Behavior

When not explicitely disabled through the `teleport` prop, dialogs are rendered in a “portal” at the end of the document `body` element, within an element having the id `chusho-dialogs-portal`. If you don’t include this element on your own, it will be created automatically.

Example of what the DOM structure should look like when a dialog is open:

```html
<body>
  <div id="app">
    <!-- Content of the page -->
  </div>

  <div id="chusho-dialogs-portal">
    <!-- Dialogs currently open -->
  </div>
</body>
```

The keyboard focus is trapped within the dialog. Consequently using <kbd>Tab</kbd> (with or without <kbd>Shift</kbd>) will loop only on focusable elements present within the Dialog, all other elements are ignored.

Once open, a dialog can be closed with the <kbd>ESC</kbd> key, by clicking on its overlay (the area around the dialog itself), or any custom button that changes the `v-model` variable to `false`. It does not include a close button by default, so you’re free to position it and style it any way you want. However it’s highly recommended you add one with a proper label.

Here’s an example using a button with just a “close” icon. As you can see we provide an alternate text for the icon so it stays accessible for everyone.

```vue-html
<CBtn @click="dialogOpen = false">
    <CIcon id="close" alt="Close dialog" />
</CBtn>
```

## Examples

### Simplest

```vue
<template>
  <CBtn @click="dialogOpen = true">Open Dialog</CBtn>
  <CDialog v-model="dialogOpen">Dialog Content</CDialog>
</template>

<script setup>
import { ref } from 'vue';

const dialogOpen = ref(false);
</script>
```

### With transition

Here’s an example where the transition is directly passed as a prop. You can also define it globally for all your dialogs; see the [config](#config).

```vue
<template>
  <CBtn @click="dialogOpen = true">Open Dialog</CBtn>
  <CDialog
    variant="spaced"
    v-model="dialogOpen"
    :transition="{ name: 'dialog' }"
  >
    Dialog Content
  </CDialog>
</template>

<script setup>
import { ref } from 'vue';

const dialogOpen = ref(false);
</script>
```

This example use the following style to have a different transition between the overlay and the dialog:

```css
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.2s;

  .dialog {
    transition-duration: 0.3s;
    transition-property: opacity transform;
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.4);
  }
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;

  .dialog {
    opacity: 0;
    transform: scale(0.9);
  }
}
```

### With title and close button

In this example, we added an `aria-labelledby` attribute on the `CDialog` component that reference the `id` of the `h1` within the Dialog. This is a great accessibility practice to give more context to your dialog.

```vue
<template>
  <CBtn @click="dialogOpen = true">Open Modal</CBtn>

  <CDialog
    v-model="dialogOpen"
    :transition="{ name: 'dialog' }"
    aria-labelledby="dialog-title"
  >
    <div class="py-6 px-8">
      <h1 id="dialog-title" class="mb-3 text-2xl font-bold">Are you sure?</h1>
      <p>
        You’re about to delete the file “<strong>cute-kitten.jpg</strong>”, are
        you sure? This action cannot be reverted.
      </p>
    </div>
    <footer class="py-4 px-8 bg-gray-100 flex justify-between items-center">
      <CBtn variant="link" @click="dialogOpen = false">Cancel</CBtn>
      <CBtn @click="dialogOpen = false">Delete</CBtn>
    </footer>
  </CDialog>
</template>

<script setup>
import { ref } from 'vue';

const dialogOpen = ref(false);
</script>
```
