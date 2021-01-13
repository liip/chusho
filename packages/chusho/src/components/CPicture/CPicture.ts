import {
  defineComponent,
  h,
  inject,
  mergeProps,
  PropType,
  SourceHTMLAttributes,
} from 'vue';

import { DollarChusho } from '../../types';
import { generateConfigClass } from '../../utils/components';
import componentMixin from '../mixins/componentMixin';

export default defineComponent({
  name: 'CPicture',

  mixins: [componentMixin],

  inheritAttrs: false,

  props: {
    /**
     * Default/fallback image URL used in the `src` attribute.
     */
    src: {
      type: String,
      required: true,
    },
    /**
     * Alternative text description; leave empty if the image is not a key part of the content, otherwise describe what can be seen.
     */
    alt: {
      type: String,
      default: '',
    },
    /**
     * Generate multiple `source` elements with the given attributes.
     */
    sources: {
      type: Array as PropType<SourceHTMLAttributes[]>,
      default: () => [],
    },
  },

  render() {
    const pictureConfig = inject<DollarChusho | null>('$chusho', null)?.options
      ?.components?.picture;
    const elementProps: Record<string, unknown> = mergeProps(this.$attrs, {
      src: this.$props.src,
      alt: this.$props.alt,
      ...generateConfigClass(pictureConfig?.class, this.$props),
    });
    const sources = this.$props.sources.map((source) => h('source', source));

    return h('picture', null, [...sources, h('img', elementProps)]);
  },
});
