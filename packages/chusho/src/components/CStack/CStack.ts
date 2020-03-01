import Vue, { VNode } from 'vue';
import { warn } from '@/utils/debug';

interface StackProps {
  gap: string;
  containerTag: string;
  itemTag: string;
}

export default Vue.extend<StackProps>({
  name: 'CStack',

  functional: true,

  props: {
    /**
     * One of the gaps defined in the config (stack.gaps) to apply to the element.
     */
    gap: {
      type: String,
      required: true,
    },
    /**
     * The tag used for the container, example: `ul`
     */
    containerTag: {
      type: String,
      default: 'div',
    },
    /**
     * The tag used for the items, example: `li`
     */
    itemTag: {
      type: String,
      default: 'div',
    },
  },

  render(h, { children, props, data, parent }): VNode {
    const stackConfig = parent?.$chusho?.options?.components?.stack;
    const gap = stackConfig?.gaps?.[props.gap];

    if (!gap) {
      warn(
        `Cannot find a Stack "gap" named "${props.gap}" in the config, you must define it before referencing it.`
      );
      return h('div', data, children);
    }

    // Wrap each children in a container to apply the gap
    children = children.map(
      (child: VNode): VNode => {
        // Skip empty/whitespace-only text nodes
        return child.tag || (child.text && child.text.trim().length)
          ? h(props.itemTag, { class: gap.itemClass }, [child])
          : child;
      }
    );

    data.class = [data.class, gap.containerClass];

    return h(props.containerTag, data, children);
  },
});
