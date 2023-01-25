# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.6.0](https://github.com/liip/chusho/compare/v0.5.1...v0.6.0) (2023-01-25)

### Code Refactoring

- **components:** Tabs now use interactiveList compsable under the hood ([46812e7](https://github.com/liip/chusho/commit/46812e703a00b3022db4fb92b7fe688d78056de5))

### Features

- **components:** transform variant prop value into an object for config class, close [#258](https://github.com/liip/chusho/issues/258) ([ec72ad3](https://github.com/liip/chusho/commit/ec72ad378e977e3b0acb4c8c66d468174a174cb6))
- **directives:** clickOutside allows to ignore elements ([82c2e85](https://github.com/liip/chusho/commit/82c2e85055803a20a4ace007202ee5674cbea9cb))
- provide a defineConfig function and better type components config class context ([0fb145a](https://github.com/liip/chusho/commit/0fb145a0c745f46dfe23bc2a9a201a27548f024b))

### BREAKING CHANGES

- **components:** The `variant` prop value of all components is now normalized into an object of type `{ [variant]: boolean }` before being given to the component config `class` method. See « Styling components » guide for updated usage.
- **components:** CTabs now require a `v-model` or the `default-tab` prop to be set.

## [0.5.1](https://github.com/liip/chusho/compare/v0.5.0...v0.5.1) (2022-10-08)

**Note:** Version bump only for package @chusho/docs

# [0.5.0](https://github.com/liip/chusho/compare/v0.4.0...v0.5.0) (2022-03-13)

### Features

- **components:** CFormGroup, closes [#116](https://github.com/liip/chusho/issues/116) ([cf10148](https://github.com/liip/chusho/commit/cf101480b1c87f73c083359d0d663251cb439b1f))

# 0.4.0 (2022-03-02)

### chore

- **deps:** update Chūshō deps ([0eb0593](https://github.com/liip/chusho/commit/0eb059322987a7217ca510d0b57cd801ccc058db))

### Features

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

**Note:** Version bump only for package @chusho/docs

# 0.2.0 (2021-01-20)

### Features

- **components:** responsive images with CPicture ([7a37dcb](https://github.com/liip/chusho/commit/7a37dcb5ae47a49b06de0d49d448f70679d686b2)), closes [#12](https://github.com/liip/chusho/issues/12)

# 0.2.0-beta.3 (2020-12-02)

### Features

- **build:** split ES bundle to leverage treeshaking ([9d22cba](https://github.com/liip/chusho/commit/9d22cbaf08c646948feed90fc0695c1de6eb86f3)), closes [#30](https://github.com/liip/chusho/issues/30)

# 0.2.0-beta.2 (2020-11-29)

**Note:** Version bump only for package @chusho/docs

# [0.2.0-beta.1](https://github.com/liip/chusho/compare/v0.2.0-beta.0...v0.2.0-beta.1) (2020-11-25)

**Note:** Version bump only for package @chusho/docs

# [0.2.0-beta.0](https://github.com/liip/chusho/compare/v0.1.0-alpha.6...v0.2.0-beta.0) (2020-11-25)

### Features

- remove CFlex component ([8a710f8](https://github.com/liip/chusho/commit/8a710f8cc9042ce85baeea3822a19c179acd4eef))
- **Preset:** drop Tailwind preset ([bcdf7da](https://github.com/liip/chusho/commit/bcdf7daefa352d58facb1801ab83567bbc06d5da))

### BREAKING CHANGES

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

# [0.1.0-alpha.3](https://github.com/liip/chusho/compare/v0.1.0-alpha.2...v0.1.0-alpha.3) (2020-04-22)

**Note:** Version bump only for package @chusho/docs

# [0.1.0-alpha.2](https://github.com/liip/chusho/compare/v0.1.0-alpha.1...v0.1.0-alpha.2) (2020-04-19)

**Note:** Version bump only for package @chusho/docs

# [0.1.0-alpha.1](https://github.com/liip/chusho/compare/v0.1.0-alpha.0...v0.1.0-alpha.1) (2020-04-13)

**Note:** Version bump only for package @chusho/docs
