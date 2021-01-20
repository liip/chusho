# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 0.2.0 (2021-01-20)


### Features

* **components:** responsive images with CPicture ([7a37dcb](https://github.com/liip/chusho/commit/7a37dcb5ae47a49b06de0d49d448f70679d686b2)), closes [#12](https://github.com/liip/chusho/issues/12)





# 0.2.0-beta.3 (2020-12-02)


### Features

* **build:** split ES bundle to leverage treeshaking ([9d22cba](https://github.com/liip/chusho/commit/9d22cbaf08c646948feed90fc0695c1de6eb86f3)), closes [#30](https://github.com/liip/chusho/issues/30)





# 0.2.0-beta.2 (2020-11-29)

**Note:** Version bump only for package root





# [0.2.0-beta.1](https://github.com/liip/chusho/compare/v0.2.0-beta.0...v0.2.0-beta.1) (2020-11-25)


### Bug Fixes

* bring back dedicated export per component ([1e7fbdf](https://github.com/liip/chusho/commit/1e7fbdf6125f072c03eb47cb06f27bef98305754))





# [0.2.0-beta.0](https://github.com/liip/chusho/compare/v0.1.0-alpha.6...v0.2.0-beta.0) (2020-11-25)


### Bug Fixes

* **Tabs:** properly apply classes based on `bare` prop ([b34adef](https://github.com/liip/chusho/commit/b34adefead9b1ece4ea352cbd5992b9f11b2c2ab))


### Features

* **core:** allow to dynamically style all components globally ([56964f5](https://github.com/liip/chusho/commit/56964f54b7e4add40ab2580c1b4d24c7f55111f1))
* **Directives:** introduce clickOutside directive ([bd59230](https://github.com/liip/chusho/commit/bd592303e42048250cebf65fa42ccd01eae5b312))
* move to Vue 3 ([0793f36](https://github.com/liip/chusho/commit/0793f361a9947cf78d1591964f782ad7fdab8607))
* remove CFlex component ([8a710f8](https://github.com/liip/chusho/commit/8a710f8cc9042ce85baeea3822a19c179acd4eef))
* **Preset:** drop Tailwind preset ([bcdf7da](https://github.com/liip/chusho/commit/bcdf7daefa352d58facb1801ab83567bbc06d5da))


### BREAKING CHANGES

* Chūshō now works only with Vue 3.
* This component was causing too many issues with PurgeCSS due to its dynamic classes. Most of it can now be easily achieved with Tailwind’s « space » helpers and CSS « gap » property.
* **Preset:** Tailwind preset was removed and shouldn’t be used anymore. Have a look at Tailwind’s « flex » and « space » helpers instead.





# [0.1.0-alpha.6](https://github.com/liip/chusho/compare/v0.1.0-alpha.5...v0.1.0-alpha.6) (2020-11-13)


### Performance Improvements

* Do not register components automatically ([e3e209f](https://github.com/liip/chusho/commit/e3e209f32a9096df1c71db297a36447750a2c551))


### BREAKING CHANGES

* Components aren’t registered automatically anymore to leverage tree shaking, you need to manually import and register components you want to use. See https://www.chusho.dev/guide/#using-components





# [0.1.0-alpha.5](https://github.com/liip/chusho/compare/v0.1.0-alpha.4...v0.1.0-alpha.5) (2020-09-17)


### Features

* Alert component ([#52](https://github.com/liip/chusho/issues/52)) ([6ae9f3c](https://github.com/liip/chusho/commit/6ae9f3cc2325dee72b9db28227a54b843d9d083e)), closes [#51](https://github.com/liip/chusho/issues/51)





# [0.1.0-alpha.4](https://github.com/liip/chusho/compare/v0.1.0-alpha.3...v0.1.0-alpha.4) (2020-09-09)


### Bug Fixes

* **#42:** update composition-api peer-dependency and replace createElement by h ([#43](https://github.com/liip/chusho/issues/43)) ([1027aea](https://github.com/liip/chusho/commit/1027aea685dddf3631f0198e636bdc12e3332809)), closes [#42](https://github.com/liip/chusho/issues/42)
* **#44:** Fix duplicate dialogs issue when re-rendered ([#45](https://github.com/liip/chusho/issues/45)) ([d1b4114](https://github.com/liip/chusho/commit/d1b41140b39176203a5fb9141b6add03bf6dcf0f))
* **ToggleBtn:** avoid CBtn props from appearing in the DOM ([0cf70c1](https://github.com/liip/chusho/commit/0cf70c1743d97bf50a857719975e364258603959))





# [0.1.0-alpha.3](https://github.com/liip/chusho/compare/v0.1.0-alpha.2...v0.1.0-alpha.3) (2020-04-22)


### Bug Fixes

* **Dialog:** keep portal-vue separated from bundle ([ee317c0](https://github.com/liip/chusho/commit/ee317c01cbeb009ac1cca5fadfc73cf0ee4f54ca))
* **Dialog:** prevent hydration issues after SSR ([a674f24](https://github.com/liip/chusho/commit/a674f24f8c2a62fd1632d4346a0afb48d14e95b9)), closes [#31](https://github.com/liip/chusho/issues/31)
* **Preset Tailwind:** properly load chusho & build ([a8aa5fc](https://github.com/liip/chusho/commit/a8aa5fca85b125ee9e65d5d05761da2af65dbe1e))





# [0.1.0-alpha.2](https://github.com/liip/chusho/compare/v0.1.0-alpha.1...v0.1.0-alpha.2) (2020-04-19)


### Bug Fixes

* **CToggle:** ensure transition can be disabled at component-level ([ac4cdaf](https://github.com/liip/chusho/commit/ac4cdafeb319e3363e0aead803a2f2f2b4e30a52))





# [0.1.0-alpha.1](https://github.com/liip/chusho/compare/v0.1.0-alpha.0...v0.1.0-alpha.1) (2020-04-13)


### Bug Fixes

* **Tabs:** properly export components ([c7e04ff](https://github.com/liip/chusho/commit/c7e04ff7226e1a00832cb8c0ada8e81ca6f67364))
