import {
  defineComponent,
  createElement,
  InjectionKey,
  provide,
} from '@vue/composition-api';
import { VNodeData } from 'vue/types/umd';
import { mergeData } from 'vue-functional-data-merge';
import { ContainerItemClass } from '@/types';
import { warn } from '@/utils/debug';

export const FlexSymbol: InjectionKey<object> = Symbol();

export interface UseFlex {
  gapX?: ContainerItemClass;
  gapY?: ContainerItemClass;
}

interface FlexProps {
  gap?: string | number | Array<string>;
}

export default defineComponent<FlexProps>({
  name: 'CFlex',

  props: {
    /**
     * One of the gaps defined in the config (flex.gaps) to apply to the element.
     *
     * A value of type string apply the same gap on both axis. Use an array of type `[x, y]` to have a different gap between columns and rows.
     */
    gap: {
      type: [String, Number, Array],
      default: null,
    },
  },

  setup(props, { attrs, slots, parent }) {
    const flexConfig = parent!.$chusho.options.components?.flex;
    const gapXKey = props.gap instanceof Array ? props.gap[0] : props.gap;
    const gapYKey = props.gap instanceof Array ? props.gap[1] : props.gap;
    const gapX = gapXKey ? flexConfig?.gaps?.x?.[gapXKey] : undefined;
    const gapY = gapYKey ? flexConfig?.gaps?.y?.[gapYKey] : undefined;

    const api: UseFlex = {
      gapX,
      gapY,
    };
    provide(FlexSymbol, api);

    if (props.gap && !gapX) {
      warn(
        `Cannot find a Flex gap named "${gapXKey}" under "flex.gaps.x" defined in the config, you must define it before referencing it.`
      );
    }
    if (props.gap && !gapY) {
      warn(
        `Cannot find a Flex gap named "${gapYKey}" under "flex.gaps.y" defined in the config, you must define it before referencing it.`
      );
    }

    return () => {
      const componentData: VNodeData = mergeData(
        {
          ...attrs,
        },
        {
          class: [
            flexConfig?.containerClass,
            gapX?.containerClass,
            gapY?.containerClass,
          ],
        }
      );

      return createElement(
        'div',
        componentData,
        slots.default && slots.default()
      );
    };
  },
});
