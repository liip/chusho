import { defineComponent, h, inject, mergeProps } from 'vue';

import { DollarChusho } from '../../types';
import { generateConfigClass } from '../../utils/components';
import uuid from '../../utils/uuid';
import componentMixin from '../mixins/componentMixin';

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

  render() {
    const iconConfig = inject<DollarChusho | null>('$chusho', null)?.options
      ?.components?.icon;
    const elementProps: Record<string, unknown> = mergeProps(this.$attrs, {
      focusable: 'false',
      width: `${(iconConfig?.width || 24) * this.scale}`,
      height: `${(iconConfig?.height || 24) * this.scale}`,
      ...generateConfigClass(iconConfig?.class, this.$props),
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
        'xlink:href': `${iconConfig?.spriteUrl || ''}#${this.id}`,
      }),
    ]);
  },
});
