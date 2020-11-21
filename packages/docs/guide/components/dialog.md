# Dialog

Display content in a modal dialog, on top of the page content.

```vue
<script>
export default {
    data() {
        return {
            dialogOpen: false,
        };
    },
};
</script>

<template>
    <div>
        <CBtn variant="default medium" @click="dialogOpen = true">
            Open Dialog
        </CBtn>

        <CDialog v-model="dialogOpen">
            <div>Dialog Content</div>

            <div>
                <CBtn
                    variant="default medium"
                    class="mt-4"
                    @click="dialogOpen = false"
                >
                    Close Dialog
                </CBtn>
            </div>
        </CDialog>
    </div>
</template>
```

## Behavior

Dialogs are rendered in a “portal” at the end of the document `body` element, within an element having the id `chusho-dialogs-portal`. If you don’t include this element on your own, it will be created automatically. All the sibling elements of this container will get an `aria-hidden` attribute set to `true` when the dialog is open and removed when it’s closed. This ensure screen readers focus on the dialog content and ignore the rest while it’s open.

Example of what the DOM structure should look like when a dialog is open:

```html
<body>
    <!-- Hidden from screen readers through the `aria-hidden` attribute -->
    <div id="app" aria-hidden="true">
        <!-- Content of the page -->
    </div>

    <div id="chusho-dialogs-portal">
        <!-- Dialogs currently open -->
    </div>
</body>
```

For the same reason, the keyboard focus is trapped within the dialog. Consequently using <kbd>Tab</kbd> (with or without <kbd>Shift</kbd>) will loop only on focusable elements present within the Dialog, all other elements are ignored.

Once open, a dialog can be closed with the <kbd>ESC</kbd> key, by clicking on its overlay (the area around the dialog itself), or any custom button that changes the `v-model` variable to `false`. It does not include a close button by default, so you’re free to position it and style it any way you want. However it’s highly recommended you add one with a proper label.

Here’s an example using a button with just a “close” icon. As you can see we provide an alternate text for the icon so it stays accessible for everyone.

```jsx
<CBtn v-on:click="dialogOpen = false">
    <CIcon id="close" alt="Close dialog" />
</CBtn>
```

## Config

### overlayClass

-   **type:** `string`

Class applied to all overlays (the element containing the dialog).

### dialogClass

-   **type:** `string`

Class applied to all dialogs.

### transition

-   **type:** `object`

Apply a common transition to all Dialogs. The object can contain any Vue built-in [transition component props](https://vuejs.org/v2/api/#transition).

For example:

```js
{ name: 'fade', mode: 'out-in' }
```

## API

<Docgen :components="['CDialog']" />

## Examples

### With transition

Here’s an example where the transition is directly passed as a prop. You can also define it globally for all your dialogs; see the [config](#config).

```vue
<script>
export default {
    data() {
        return {
            dialogOpen: false,
        };
    },
};
</script>

<template>
    <div>
        <CBtn variant="default medium" @click="dialogOpen = true">
            Open Dialog
        </CBtn>

        <CDialog v-model="dialogOpen" :transition="{ name: 'dialog' }">
            <div>Dialog Content</div>

            <div>
                <CBtn
                    variant="default medium"
                    class="mt-4"
                    @click="dialogOpen = false"
                >
                    Close Dialog
                </CBtn>
            </div>
        </CDialog>
    </div>
</template>
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

### With scrollable body

Here’s an example of a more complex modal with a scrollable inner body. Take a look at the source code to see what CSS we used and feel free to take it and adapt it for your project!

```vue
<script>
export default {
    data() {
        return {
            dialogOpen: false,
        };
    },
};
</script>

<template>
    <div>
        <CBtn variant="default medium" @click="dialogOpen = true">
            Open Dialog
        </CBtn>
        <CDialog v-model="dialogOpen" aria-labelledby="example-dialog-title">
            <header class="dialog-header">
                <h1 id="example-dialog-title" class="my-0">Dialog title</h1>
                <CBtn @click="dialogOpen = false" aria-label="Close dialog">
                    <span aria-hidden>✗</span>
                </CBtn>
            </header>

            <div class="dialog-body">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Omnis eius minus, nam rerum corrupti nihil doloribus
                    blanditiis officia fugit debitis nesciunt, corporis unde
                    atque ratione voluptatem quisquam. Ullam, ut omnis fugiat
                    ipsum accusantium esse debitis reprehenderit vero impedit
                    consequatur quia repellat nesciunt voluptatem ipsam! Ea
                    eveniet placeat culpa similique voluptatem sunt ut
                    voluptatum corrupti id aut rem, eum saepe aperiam! Voluptas
                    repellendus sint ullam architecto quidem corporis,
                    voluptatibus eligendi, distinctio voluptatum explicabo ab
                    tempore laboriosam quas cupiditate inventore aperiam quo
                    voluptates ducimus nobis recusandae.
                </p>
                <p>
                    Deserunt repellendus nesciunt officiis excepturi delectus
                    inventore debitis consequatur nihil unde tempore aspernatur
                    sit minima voluptates quis, numquam, repudiandae laudantium
                    recusandae dolor velit libero, tempora asperiores rem? Natus
                    accusamus nostrum praesentium minima adipisci, numquam
                    cupiditate eos ratione sit sapiente asperiores quas ipsa
                    deleniti porro, repellat recusandae. Facere enim dolores
                    eius accusamus corporis assumenda quisquam alias deleniti
                    sapiente exercitationem a, ea repellendus beatae culpa
                    molestiae inventore voluptas provident ducimus neque, magnam
                    facilis sit deserunt possimus repudiandae.
                </p>
                <p>
                    Quae fugit ea non velit perspiciatis nisi sapiente itaque
                    praesentium, nesciunt, sint exercitationem voluptatum! At
                    eos non esse doloremque soluta eveniet vel itaque ullam
                    quibusdam quod, voluptas ad alias ea, hic error fugit odit
                    officiis nostrum! Ex eligendi consequuntur in, quibusdam sed
                    animi itaque? Dolorum cum ratione molestias laudantium ullam
                    fuga praesentium tenetur maiores ad repellendus sequi
                    officiis iusto sunt consequuntur dolore reiciendis
                    perspiciatis distinctio, eos cupiditate atque nostrum.
                    Voluptatibus aspernatur veritatis aliquid sint corrupti
                    eaque.
                </p>
                <p>
                    Placeat nostrum veniam sit deserunt ipsum explicabo beatae
                    quia magni aliquam, accusantium nam temporibus quaerat in
                    commodi modi, quam, nemo amet labore at dolorem culpa
                    voluptate. Soluta inventore at dolore neque rerum!
                </p>
                <p>
                    Deleniti accusantium amet ex quibusdam aut sed ab ad autem!
                    Accusamus exercitationem in sapiente perspiciatis incidunt
                    enim corporis non, tenetur commodi et, harum reiciendis
                    esse, inventore distinctio voluptas dolore! In, dignissimos
                    facilis officia commodi quod architecto corporis accusamus
                    deleniti accusantium maxime et vitae placeat repudiandae
                    dolorum ea nam velit esse qui? Dicta voluptate aliquid quo,
                    excepturi voluptatum, autem eveniet labore quaerat ad vitae
                    facere consectetur at minima eos veritatis nostrum nisi
                    aliquam modi consequatur officia culpa numquam impedit
                    velit?
                </p>
            </div>

            <footer class="dialog-footer">
                <CBtn variant="default medium" @click="dialogOpen = false">
                    Agree
                </CBtn>
            </footer>
        </CDialog>
    </div>
</template>
};
```

::: tip
In the example above, we added an `aria-labelledby` attribute on the `CDialog` component that reference the `id` of the `h1` within the Dialog. This is a great accessibility practice to give more context to your dialog.
:::
