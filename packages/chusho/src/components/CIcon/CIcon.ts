import Vue, { VNode, VNodeData } from 'vue';
import { mergeData } from 'vue-functional-data-merge';
import uuid from '@/utils/uuid';

interface IconProps {
  id: string;
  scale: number;
  alt: string;
}

/**
 * If you specify the `spriteUrl` in the config, it'll load the sprite remotely. Note that this technique doesn't work
 * on Internet Explorer, but it can be polyfilled with [svgxuse](https://github.com/Keyamoon/svgxuse).
 * Learn more about [SVG Sprites](https://css-tricks.com/svg-sprites-use-better-icon-fonts/) on CSS-Tricks.
 */
export default Vue.extend<IconProps>({
  name: 'CIcon',

  functional: true,

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

  render(h, { props, data, parent }): VNode {
    const { icon } = parent.$chusho.options;
    const componentData: VNodeData = {
      attrs: {
        focusable: 'false',
      },
      class: icon.class,
      style: {
        width: `${icon.width * props.scale}px`,
        height: `${icon.height * props.scale}px`,
      },
    };
    const uid = `chusho-icon-${uuid()}`;

    if (componentData.attrs) {
      if (props.alt) {
        componentData.attrs['aria-labelledby'] = uid;
      } else {
        componentData.attrs['aria-hidden'] = true;
      }
    }

    return h('svg', mergeData(data, componentData), [
      props.alt &&
        h(
          'title',
          {
            attrs: {
              id: uid,
            },
          },
          [props.alt]
        ),
      h('use', {
        key: props.id,
        attrs: {
          'xlink:href': `${icon.spriteUrl}#${props.id}`,
        },
      }),
    ]);
  },
});
