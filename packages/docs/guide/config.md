---
next: /guide/components/
---

# Config

Here is a summary of the `config` object you can provide when setuping Chūshō with `Vue.use(Chusho, config)`.

## rtl

- **type:** `function`
- **default:**
  ```js
  function () {
    return document && document.dir === 'rtl';
  }
  ```

Define if the current document direction is Right-to-left. This is used internally to adapt some behaviors.

## components

- **type:** `object`
- **default:** `null`

Configure each component globally, see each component for available options.

It will be an object that look like the following:

```js
{
  btn: {
    // Here goes your global config for the Btn component
  },
  icon: {
    // Config for the Icon component
  },
  // And so on…
}
```
