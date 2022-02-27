import { defineComponent, h, mergeProps } from 'vue';

import componentMixin from '../mixins/componentMixin';

import useComponentConfig from '../../composables/useComponentConfig';

import { generateConfigClass } from '../../utils/components';
import uuid from '../../utils/uuid';

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
    };
  },

  render() {
    const elementProps: Record<string, unknown> = mergeProps(this.$attrs, {
      focusable: 'false',
      width: `${(this.config?.width || 24) * this.scale}`,
      height: `${(this.config?.height || 24) * this.scale}`,
      ...generateConfigClass(this.config?.class, this.$props),
    });
    const id = uuid('chusho-icon');

    if (this.alt) {
      elementProps['aria-labelledby'] = id;
    } else {
      elementProps['aria-hidden'] = true;
    }

    return h('svg', elementProps, [
      this.alt &&
        h(
          'title',
          {
            id,
          },
          [this.alt]
        ),
      h('use', {
        key: this.id,
        'xlink:href': `${this.config?.spriteUrl || ''}#${this.id}`,
      }),
    ]);
  },
});
