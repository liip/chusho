# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.6.0](https://github.com/liip/chusho/compare/v0.5.1...v0.6.0) (2023-01-25)

### Bug Fixes

- **CFormGroup:** properly handle switch between flag origins ([bc10010](https://github.com/liip/chusho/commit/bc100104ddb860b49da60530ddac87b56a9f9fa1))
- **components:** properly type transition prop ([2e15ca6](https://github.com/liip/chusho/commit/2e15ca61790ee25dd9c47c07c4d5cb740f1a65aa))
- **CSelect:** allow to disable it afterwards ([ba9fd6d](https://github.com/liip/chusho/commit/ba9fd6d6e550846ef6b1dde7bd9f01cbd88fd094))
- **CSelect:** stay synchronized with v-model ([c541b2f](https://github.com/liip/chusho/commit/c541b2f829566738c751ef8fb21c365cfd4aaa59))
- focus first menu item also when opening with click ([7537630](https://github.com/liip/chusho/commit/7537630cc04115dd9f584b2be1dadb20b639fcab))
- **useKeyboardListNavigation:** ensure search query is case insensitive ([adc488d](https://github.com/liip/chusho/commit/adc488d84965f1a2a2680a2bcee452a971d56ed0))

### Code Refactoring

- **components:** Tabs now use interactiveList compsable under the hood ([46812e7](https://github.com/liip/chusho/commit/46812e703a00b3022db4fb92b7fe688d78056de5))

### Features

- **components:** create CMenu component ([982b33f](https://github.com/liip/chusho/commit/982b33f4188e95c75d02890780b9111e0b27cf2d))
- **components:** transform variant prop value into an object for config class, close [#258](https://github.com/liip/chusho/issues/258) ([ec72ad3](https://github.com/liip/chusho/commit/ec72ad378e977e3b0acb4c8c66d468174a174cb6))
- **directives:** clickOutside allows to ignore elements ([82c2e85](https://github.com/liip/chusho/commit/82c2e85055803a20a4ace007202ee5674cbea9cb))
- provide a defineConfig function and better type components config class context ([0fb145a](https://github.com/liip/chusho/commit/0fb145a0c745f46dfe23bc2a9a201a27548f024b))

### BREAKING CHANGES

- **components:** The `variant` prop value of all components is now normalized into an object of type `{ [variant]: boolean }` before being given to the component config `class` method. See « Styling components » guide for updated usage.
- **components:** CTabs now require a `v-model` or the `default-tab` prop to be set.

## [0.5.1](https://github.com/liip/chusho/compare/v0.5.0...v0.5.1) (2022-10-08)

### Bug Fixes

- **Dialog:** add aria-modal attribute for wider compatibility ([9e02396](https://github.com/liip/chusho/commit/9e02396a12dc46ca37d79338161a9c8157609b09))
- **FormGroup:** reexport injection key ([928d0de](https://github.com/liip/chusho/commit/928d0deb22be9b354ca5316d308c9b7a23f96b3d))

# [0.5.0](https://github.com/liip/chusho/compare/v0.4.0...v0.5.0) (2022-03-13)

### Features

- **components:** CFormGroup, closes [#116](https://github.com/liip/chusho/issues/116) ([cf10148](https://github.com/liip/chusho/commit/cf101480b1c87f73c083359d0d663251cb439b1f))
- expose required/disabled/readonly props in form fields config class, closes [#166](https://github.com/liip/chusho/issues/166) ([0f353a0](https://github.com/liip/chusho/commit/0f353a0babe887fa7a79c99f1f21e3bf40f803dc))

# 0.4.0 (2022-03-02)

### Bug Fixes

- **CTabs:** accept 0 as a valid target/id value ([cebd0dd](https://github.com/liip/chusho/commit/cebd0dd9de414b331a11a65e3d7e6658cb7ce036)), closes [#115](https://github.com/liip/chusho/issues/115)
- **ssr:** ensure UID consistency between server and client ([40c07d7](https://github.com/liip/chusho/commit/40c07d755b25023382b642bb422f5ff31b212632)), closes [#160](https://github.com/liip/chusho/issues/160)
- **ssr:** prevent hydration mismatches ([636fbbe](https://github.com/liip/chusho/commit/636fbbe637c050ae4d93c4bd6a3b4c30f5c890bc))

### chore

- **deps:** update Chūshō deps ([0eb0593](https://github.com/liip/chusho/commit/0eb059322987a7217ca510d0b57cd801ccc058db))

### Features

- **CBtn:** use NuxtLink in Nuxt apps ([4299f0d](https://github.com/liip/chusho/commit/4299f0d59024e0994c1a96163eaa6454cc312543)), closes [#134](https://github.com/liip/chusho/issues/134)
- **CCollapseBtn:** remove inheritBtnClass config option, closes [#155](https://github.com/liip/chusho/issues/155) ([bf84274](https://github.com/liip/chusho/commit/bf8427437883472505f919310b81c9cc0abd012d))
- **components:** CCheckbox ([20c6bc3](https://github.com/liip/chusho/commit/20c6bc34c6d4ddb4461579b8d572016e58cdb3a8))
- **components:** CLabel ([9568972](https://github.com/liip/chusho/commit/9568972042c5fb27e65457b872d1f716ddaf8425))
- **components:** CRadio ([495f8c7](https://github.com/liip/chusho/commit/495f8c7f06f813e6ced0a4b9e070c5203e4afa91))
- **components:** CTextarea ([1377a48](https://github.com/liip/chusho/commit/1377a4841c22608b04bbd947add6648a99bbbcda))
- **components:** CTextField ([2c7e604](https://github.com/liip/chusho/commit/2c7e604df8e43e93a9bdaaa59f1d4d87c32532a4))
- **components:** introduce select/listbox component ([dcda232](https://github.com/liip/chusho/commit/dcda232fa98575eb26b86f02337f28463b0962f8))

### BREAKING CHANGES

- **CCollapseBtn:** CCollapseBtn doesn’t inherit CBtn `class` config anymore.
- **deps:** CommonJS and UMD builds are now targeting ES2015 (ES6), it was previously ES5.

# 0.3.0 (2021-03-16)

**Note:** Version bump only for package chusho

# 0.2.0 (2021-01-20)

### Features

- **components:** responsive images with CPicture ([7a37dcb](https://github.com/liip/chusho/commit/7a37dcb5ae47a49b06de0d49d448f70679d686b2)), closes [#12](https://github.com/liip/chusho/issues/12)

# 0.2.0-beta.3 (2020-12-02)

### Features

- **build:** split ES bundle to leverage treeshaking ([9d22cba](https://github.com/liip/chusho/commit/9d22cbaf08c646948feed90fc0695c1de6eb86f3)), closes [#30](https://github.com/liip/chusho/issues/30)

# 0.2.0-beta.2 (2020-11-29)

**Note:** Version bump only for package chusho

# [0.2.0-beta.1](https://github.com/liip/chusho/compare/v0.2.0-beta.0...v0.2.0-beta.1) (2020-11-25)

### Bug Fixes

- bring back dedicated export per component ([1e7fbdf](https://github.com/liip/chusho/commit/1e7fbdf6125f072c03eb47cb06f27bef98305754))

# [0.2.0-beta.0](https://github.com/liip/chusho/compare/v0.1.0-alpha.6...v0.2.0-beta.0) (2020-11-25)

### Bug Fixes

- **Tabs:** properly apply classes based on `bare` prop ([b34adef](https://github.com/liip/chusho/commit/b34adefead9b1ece4ea352cbd5992b9f11b2c2ab))

### Features

- **core:** allow to dynamically style all components globally ([56964f5](https://github.com/liip/chusho/commit/56964f54b7e4add40ab2580c1b4d24c7f55111f1))
- **Directives:** introduce clickOutside directive ([bd59230](https://github.com/liip/chusho/commit/bd592303e42048250cebf65fa42ccd01eae5b312))
- move to Vue 3 ([0793f36](https://github.com/liip/chusho/commit/0793f361a9947cf78d1591964f782ad7fdab8607))
- remove CFlex component ([8a710f8](https://github.com/liip/chusho/commit/8a710f8cc9042ce85baeea3822a19c179acd4eef))
- **Preset:** drop Tailwind preset ([bcdf7da](https://github.com/liip/chusho/commit/bcdf7daefa352d58facb1801ab83567bbc06d5da))

### BREAKING CHANGES

- Chūshō now works only with Vue 3.
- This component was causing too many issues with PurgeCSS due to its dynamic classes. Most of it can now be easily achieved with Tailwind’s « space » helpers and CSS « gap » property.
- **Preset:** Tailwind preset was removed and shouldn’t be used anymore. Have a look at Tailwind’s « flex » and « space » helpers instead.

# [0.1.0-alpha.6](https://github.com/liip/chusho/compare/v0.1.0-alpha.5...v0.1.0-alpha.6) (2020-11-13)

### Performance Improvements

- Do not register components automatically ([e3e209f](https://github.com/liip/chusho/commit/e3e209f32a9096df1c71db297a36447750a2c551))

### BREAKING CHANGES

- Components aren’t registered automatically anymore to leverage tree shaking, you need to manually import and register components you want to use. See https://www.chusho.dev/guide/#using-components

# [0.1.0-alpha.5](https://github.com/liip/chusho/compare/v0.1.0-alpha.4...v0.1.0-alpha.5) (2020-09-17)

### Features

- Alert component ([#52](https://github.com/liip/chusho/issues/52)) ([6ae9f3c](https://github.com/liip/chusho/commit/6ae9f3cc2325dee72b9db28227a54b843d9d083e)), closes [#51](https://github.com/liip/chusho/issues/51)

# [0.1.0-alpha.4](https://github.com/liip/chusho/compare/v0.1.0-alpha.3...v0.1.0-alpha.4) (2020-09-09)

### Bug Fixes

- **#42:** update composition-api peer-dependency and replace createElement by h ([#43](https://github.com/liip/chusho/issues/43)) ([1027aea](https://github.com/liip/chusho/commit/1027aea685dddf3631f0198e636bdc12e3332809)), closes [#42](https://github.com/liip/chusho/issues/42)
- **#44:** Fix duplicate dialogs issue when re-rendered ([#45](https://github.com/liip/chusho/issues/45)) ([d1b4114](https://github.com/liip/chusho/commit/d1b41140b39176203a5fb9141b6add03bf6dcf0f))
- **ToggleBtn:** avoid CBtn props from appearing in the DOM ([0cf70c1](https://github.com/liip/chusho/commit/0cf70c1743d97bf50a857719975e364258603959))

# [0.1.0-alpha.3](https://github.com/liip/chusho/compare/v0.1.0-alpha.2...v0.1.0-alpha.3) (2020-04-22)

### Bug Fixes

- **Dialog:** keep portal-vue separated from bundle ([ee317c0](https://github.com/liip/chusho/commit/ee317c01cbeb009ac1cca5fadfc73cf0ee4f54ca))
- **Dialog:** prevent hydration issues after SSR ([a674f24](https://github.com/liip/chusho/commit/a674f24f8c2a62fd1632d4346a0afb48d14e95b9)), closes [#31](https://github.com/liip/chusho/issues/31)

# [0.1.0-alpha.2](https://github.com/liip/chusho/compare/v0.1.0-alpha.1...v0.1.0-alpha.2) (2020-04-19)

### Bug Fixes

- **CToggle:** ensure transition can be disabled at component-level ([ac4cdaf](https://github.com/liip/chusho/commit/ac4cdafeb319e3363e0aead803a2f2f2b4e30a52))

# [0.1.0-alpha.1](https://github.com/liip/chusho/compare/v0.1.0-alpha.0...v0.1.0-alpha.1) (2020-04-13)

### Bug Fixes

- **Tabs:** properly export components ([c7e04ff](https://github.com/liip/chusho/commit/c7e04ff7226e1a00832cb8c0ada8e81ca6f67364))
