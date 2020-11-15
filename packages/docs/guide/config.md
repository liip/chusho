---
next: /guide/components/
---

# Config

Here is a summary of the `config` object you can provide when setuping Chūshō with `Vue.use(Chusho, config)`.

## rtl

-   **type:** `function`
-   **default:**
    ```js
    function () {
      return document && document.dir === 'rtl';
    }
    ```

Define if the current document direction is Right-to-left. This is used internally to adapt some behaviors.

## components

-   **type:** `object`
-   **default:** `null`

Configure components globally, see each component page for available options.

It will be an object that looks like the following:

```js
{
  alert: {},
  btn: {},
  dialog: {},
  icon: {},
  tabs: {},
  toggle: {},
}
```
