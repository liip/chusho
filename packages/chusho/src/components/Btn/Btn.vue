<template>
  <component
    :is="tag"
    :href="href"
    :class="classNames"
    v-bind="attributes"
    v-on="$listeners"
  >
    <!-- @slot The button content -->
    <slot></slot>
  </component>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class Btn extends Vue {
  name = 'Btn';

  inheritAttrs = false;

  /**
   * Make the button a link to the given location
   */
  @Prop({ type: String, default: null })
  readonly href: string;

  /**
   * In case the button is a `button` element, specify its type
   */
  @Prop({ type: String, default: 'button' })
  readonly type: string;

  /**
   * Customize the button appearance by applying one or multiple variants defined in the config file (Btn.variants).
   * Example: `"primary large"`
   */
  @Prop({ type: String, default: '' })
  readonly variant: string;

  /**
   * Disable the button (doesn’t apply to links) and apply the associated class from the config (Btn.disabled).
   */
  @Prop({ type: Boolean, default: false })
  readonly disabled: boolean;

  get tag(): string {
    return this.href ? 'a' : 'button';
  }

  get attributes(): object {
    return Object.assign(
      {},
      {
        // Concerns only on button tags, skip for anchors
        ...(this.disabled && this.tag === 'button' && { disabled: true }),
        ...(this.type && this.tag === 'button' && { type: this.type }),
      },
      this.$attrs
    );
  }

  get classNames(): Array<string | object> {
    const { btn } = this.$chusho.options;

    const classes = [btn.default, { [btn.disabled]: this.disabled }];
    const variants = this.variant.split(' ');

    variants.forEach(variant => {
      const target = btn.variants[variant];
      if (target) classes.push(target);
    });

    return classes;
  }
}
</script>
