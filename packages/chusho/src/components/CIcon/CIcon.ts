import { defineComponent, h, inject, mergeProps } from 'vue';
import { DollarChusho } from '../../types';
import uuid from '../../utils/uuid';

export default defineComponent({
  name: 'CIcon',

  inheritAttrs: false,

  props: {
    /**
     * The id of the symbol (icon) to display from within the sprite.
     */
    id: {
      type: String,
      required: true,
    },
    /**
     * The scale relative to the dimensions defined in the config (icon.width, icon.height).
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

  setup(props, { attrs }) {
    return () => {
      const iconConfig = inject<DollarChusho | null>('$chusho', null)?.options
        ?.components?.icon;
      let elementProps: Record<string, unknown> = mergeProps(attrs, {
        focusable: 'false',
        style: {
          width: `${(iconConfig?.width || 24) * props.scale}px`,
          height: `${(iconConfig?.height || 24) * props.scale}px`,
        },
      });
      const id = uuid('chusho-icon');

      if (iconConfig?.class) {
        elementProps = mergeProps(elementProps, { class: iconConfig.class });
      }

      if (props.alt) {
        elementProps['aria-labelledby'] = id;
      } else {
        elementProps['aria-hidden'] = true;
      }

      return h('svg', elementProps, [
        props.alt &&
          h(
            'title',
            {
              id,
            },
            [props.alt]
          ),
        h('use', {
          key: props.id,
          'xlink:href': `${iconConfig?.spriteUrl || ''}#${props.id}`,
        }),
      ]);
    };
  },
});
