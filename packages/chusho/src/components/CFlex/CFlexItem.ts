import { defineComponent, createElement, inject } from '@vue/composition-api';
import { warn } from '@/utils/debug';
import { mergeData } from 'vue-functional-data-merge';
import { VNodeData } from 'vue/types/umd';
import { FlexSymbol, UseFlex } from './CFlex';
import { isPlainObject } from '@/utils/objects';

interface FlexItemProps {
  width: string | Dictionary<string>;
}

export default defineComponent<FlexItemProps>({
  name: 'CFlexItem',

  props: {
    /**
     * One or more widths defined in the config (flex.widths) to apply to the element.
     *
     * Single default value: `width="1/2"`
     *
     * Multiple values: `:width="{ default: '1/2', sm: '1/3', md: '1/4' }"`
     *
     * Except the `default` key which acts like the single value, all others (`sm` & `md` here) are totally up to you. They should probably match your own breakpoints naming though.
     *
     * You can change how responsive classes are generated by defining a custom `responsiveClassGenerator` function in the config.
     */
    width: {
      type: [String, Object],
    },
  },

  setup(props, { slots, attrs, parent }) {
    const chushoOptions = parent!.$chusho.options;
    const flexConfig = chushoOptions.components?.flex;
    const flex = inject(FlexSymbol) as UseFlex;
    const widthClasses: Array<string> = [];
    let widths: Dictionary<string>;

    if (props.width) {
      if (isPlainObject(props.width)) {
        widths = props.width;
      } else {
        widths = {
          default: props.width,
        };
      }

      const breakpoints = Object.keys(widths);

      breakpoints.forEach(breakpoint => {
        const value = widths[breakpoint];
        const width = flexConfig?.widths?.[value];

        if (width) {
          if (breakpoint === 'default') {
            widthClasses.push(width);
            return;
          }
          widthClasses.push(
            chushoOptions.responsiveClassGenerator(breakpoint, width)
          );
        } else {
          warn(
            `Cannot find a FlexItem width named "${value}" defined under "flex.widths" in the config, you must define it before referencing it.`
          );
        }
      });

      const hasDefault = breakpoints.includes('default');
      if (!hasDefault && flexConfig?.widths?.fallback) {
        widthClasses.push(flexConfig.widths.fallback);
      }
    }

    return () => {
      const componentData: VNodeData = mergeData(
        {
          ...attrs,
        },
        {
          class: [
            ...widthClasses,
            flexConfig?.itemClass,
            flex.gapX?.itemClass,
            flex.gapY?.itemClass,
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
