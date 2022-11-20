import {
  PropType,
  SourceHTMLAttributes,
  defineComponent,
  h,
  mergeProps,
} from 'vue';

import componentMixin from '../mixins/componentMixin';

import useComponentConfig from '../../composables/useComponentConfig';

import { generateConfigClass } from '../../utils/components';

export default defineComponent({
  name: 'CPicture',

  mixins: [componentMixin],

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

  setup() {
    return {
      config: useComponentConfig('picture'),
    };
  },

  render() {
    const elementProps: Record<string, unknown> = mergeProps(this.$attrs, {
      src: this.$props.src,
      alt: this.$props.alt,
      ...generateConfigClass(this.config?.class, this.$props),
    });
    const sources = this.$props.sources.map((source) => h('source', source));

    return h('picture', null, [...sources, h('img', elementProps)]);
  },
});
