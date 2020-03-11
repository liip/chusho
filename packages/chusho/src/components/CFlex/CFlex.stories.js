import CFlex from './CFlex';
import CFlexItem from './CFlexItem';

export default {
  title: 'Components|Flex',
  component: CFlex,
  subcomponents: { CFlexItem },
  parameters: {
    componentSubtitle: 'Layout content in rows or columns responsively.',
    options: {
      componentConfig: [
        {
          name: 'containerClass',
          type: { summary: 'string' },
          description: 'Classes to apply to all Flex containers.',
        },
        {
          name: 'itemClass',
          type: { summary: 'string' },
          description: 'Classes to apply to all Flex items.',
        },
        {
          name: 'gaps',
          type: { summary: 'object' },
          description:
            'List of available gaps.\n\nFor example: `{ "1": { "containerClass": "-mt-1", "itemClass": "mt-1" } }`',
        },
        {
          name: 'widths',
          type: { summary: 'object' },
          description:
            "List of widths/classes pair CFlexItem will apply based on its `width` prop.\n\nFor example: `{ '1/2': 'w-1/2', '1/3': 'w-1/3', fallback: 'w-full' }`\n\nNotice the special `fallback` key that will be applied when a `width` object is passed without a `default` value.",
        },
        {
          name: 'defaultWidth',
          type: { summary: 'string' },
          description:
            'When creating grids, you usually want items to take the whole width available when it isn’t specified otherwise. Some CSS frameworks requires this to be set explicitely, for example Tailwind wants a `w-full` class on each item. But specifying this value on every of them can be quite cumbersome, ence this setting that will automatically apply the given class on every item without an explicit `default` width.',
        },
        {
          name: 'responsiveWidthGenerator',
          type: { summary: 'function' },
          description:
            "Control how Flex items responsive classes are generated.\n\nFor example, with the following widths defined in the config:\n\n`widths: { '1/2': 'w-1/2' }`\n\nThe following Flex item:\n\n`<CFlexItem :width=\"{ sm: '1/2' }\"></CFlexItem>`\n\nwill get the class `sm:w-1/2`.",
          defaultValue: {
            summary: '(breakpoint, width) => `${breakpoint}:${width}`',
          },
        },
      ],
    },
  },
};

export const GridResponsive = () => ({
  components: { CFlex, CFlexItem },
  template: `
    <CFlex gap="2">
      <CFlexItem width="1/3">
        <div class="bg-gray-200 p-2">
          1
        </div>
      </CFlexItem>
      <CFlexItem width="1/3">
        <div class="bg-gray-200 p-2">
          2
        </div>
      </CFlexItem>
      <CFlexItem width="1/3">
        <div class="bg-gray-200 p-2">
          3
        </div>
      </CFlexItem>
      <CFlexItem :width="{ md: '2/3' }">
        <div class="bg-gray-200 p-2">
          4
        </div>
      </CFlexItem>
      <CFlexItem :width="{ md: '1/3' }">
        <div class="bg-gray-200 p-2">
          5
        </div>
      </CFlexItem>
      <CFlexItem :width="{ sm: '1/3', lg: '1/2' }">
        <div class="bg-gray-200 p-2">
          6
        </div>
      </CFlexItem>
      <CFlexItem :width="{ sm: '1/3', lg: '1/2' }">
        <div class="bg-gray-200 p-2">
          7
        </div>
      </CFlexItem>
    </CFlex>
  `,
});

export const DifferentGapByAxis = () => ({
  components: { CFlex, CFlexItem },
  template: `
    <CFlex :gap="[3, 6]">
      <CFlexItem width="1/3">
        <div class="bg-gray-200 p-2">
          1
        </div>
      </CFlexItem>
      <CFlexItem width="1/3">
        <div class="bg-gray-200 p-2">
          2
        </div>
      </CFlexItem>
      <CFlexItem width="1/3">
        <div class="bg-gray-200 p-2">
          3
        </div>
      </CFlexItem>
      <CFlexItem :width="{ md: '2/3', lg: '1/2' }">
        <div class="bg-gray-200 p-2">
          4
        </div>
      </CFlexItem>
      <CFlexItem :width="{ md: '1/3', lg: '1/2' }">
        <div class="bg-gray-200 p-2">
          5
        </div>
      </CFlexItem>
    </CFlex>
  `,
});

export const Stack = () => ({
  components: { CFlex, CFlexItem },
  template: `
    <CFlex gap="3">
      <CFlexItem>
        <div class="p-2 bg-gray-200">
          1
        </div>
      </CFlexItem>
      <CFlexItem>
        <div class="p-2 bg-gray-200">
          2
        </div>
      </CFlexItem>
      <CFlexItem>
        <div class="p-2 bg-gray-200">
          3
        </div>
      </CFlexItem>
    </CFlex>
  `,
});

export const Inline = () => ({
  components: { CFlex, CFlexItem },
  data() {
    return {
      colors: [
        'Alice Blue',
        'Antique White',
        'Aqua',
        'Aquamarine',
        'Azure',
        'Beige',
        'Bisque',
        'Black',
        'Blanched Almond',
        'Blue',
        'Blue Violet',
        'Brown',
        'Burly Wood',
        'Cadet Blue',
        'Chartreuse',
        'Chocolate',
        'Coral',
        'Cornflower Blue',
        'Cornsilk',
        'Crimson',
        'Cyan',
        'Dark Blue',
        'Dark Cyan',
        'Dark GoldenRod',
        'Dark Gray',
        'Dark Green',
      ],
    };
  },
  template: `
    <CFlex gap="2">
      <CFlexItem width="auto" v-for="(color, i) in colors" :key="i">
        <div class="bg-gray-200 p-2">
          {{ color }}
        </div>
      </CFlexItem>
    </CFlex>
  `,
});

export const Nested = () => ({
  components: { CFlex, CFlexItem },
  template: `
    <CFlex gap="8">
      <CFlexItem width="1/2">
        <CFlex gap="2">
          <CFlexItem width="full">
            <div class="p-2 bg-gray-200">
              Column 1, item 1
            </div>
          </CFlexItem>
          <CFlexItem width="full">
            <div class="p-2 bg-gray-200">
              Column 1, item 2
            </div>
          </CFlexItem>
        </CFlex>
      </CFlexItem>
      <CFlexItem width="1/2">
        <div class="p-2 bg-gray-200">
          Column 2
        </div>
      </CFlexItem>
    </CFlex>
  `,
});
