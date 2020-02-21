<script lang="ts">
import Vue, { VNodeData } from 'vue';
import { mergeData } from 'vue-functional-data-merge';
import { VNode } from 'vue/types/umd';

interface BtnProps {
  href: string;
  type: string;
  variant: string;
  disabled: boolean;
}

export default Vue.extend<BtnProps>({
  name: 'CBtn',

  functional: true,

  props: {
    /**
     * Make the button a link to the given location
     */
    href: {
      type: String,
      default: null,
    },

    /**
     * In case the button is a `button` element, specify its type
     */
    type: {
      type: String,
      default: 'button',
    },

    /**
     * Customize the button appearance by applying one or multiple variants defined in the config (btn.variants).
     * Example: `"primary large"`
     */
    variant: {
      type: String,
      default: '',
    },

    /**
     * Disable the button (doesn’t apply to links) and apply the associated class from the config (btn.disabled).
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  render(h, { props, data, parent, children }): VNode {
    const { btn } = parent.$chusho.options;
    const tag = props.href ? 'a' : 'button';

    const classes = [btn.default, { [btn.disabled]: props.disabled }];
    const variants = props.variant.split(' ');
    variants.forEach(variant => {
      const target = btn.variants[variant];
      if (target) classes.push(target);
    });

    const componentData: VNodeData = {
      class: classes,
      attrs: {
        href: props.href,
        // Concerns only on button tags, skip for anchors
        ...(props.disabled && tag === 'button' && { disabled: true }),
        ...(props.type && tag === 'button' && { type: props.type }),
      },
    };

    return h(tag, mergeData(data, componentData), children);
  },
});
</script>
