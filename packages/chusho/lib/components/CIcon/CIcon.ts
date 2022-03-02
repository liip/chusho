import { defineComponent, h, mergeProps } from 'vue';

import componentMixin from '../mixins/componentMixin';

import useCachedUid from '../../composables/useCachedUid';
import useComponentConfig from '../../composables/useComponentConfig';

import { generateConfigClass } from '../../utils/components';

export default defineComponent({
  name: 'CIcon',

  mixins: [componentMixin],

  inheritAttrs: false,

  props: {
    /**
     * The id of the symbol (icon) to display from the sprite.
     */
    id: {
      type: String,
      required: true,
    },

    /**
     * Multiply the width/height defined in the config to change the icon display size.
     */
    scale: {
      type: Number,
      default: 1,
    },

    /**
     * Provides an alternate text to describe the icon meaning in the context its used.
     * In cases where an icon would be used without any label close by, this is important
     * to provide for accessibility.
     *
     * Example: imagine a lonely trash icon within a button dedicated to delete an article,
     * this prop should be set to a value like "Delete article".
     */
    alt: {
      type: String,
      default: '',
    },
  },

  setup() {
    return {
      config: useComponentConfig('icon'),
      uid: useCachedUid('chusho-icon'),
    };
  },

  render() {
    const elementProps: Record<string, unknown> = mergeProps(this.$attrs, {
      focusable: 'false',
      width: `${(this.config?.width || 24) * this.scale}`,
      height: `${(this.config?.height || 24) * this.scale}`,
      ...generateConfigClass(this.config?.class, this.$props),
      ...this.uid.cacheAttrs,
    });

    const children = [
      h('use', {
        key: this.id,
        'xlink:href': `${this.config?.spriteUrl || ''}#${this.id}`,
      }),
    ];

    if (this.alt) {
      elementProps['aria-labelledby'] = this.uid.id.value;
      children.unshift(
        h(
          'title',
          {
            id: this.uid.id.value,
          },
          this.alt
        )
      );
    } else {
      elementProps['aria-hidden'] = true;
    }

    return h('svg', elementProps, children);
  },
});
