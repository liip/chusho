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
          name: 'widths',
          type: { summary: 'object' },
          description:
            "List of widths/classes pair CFlexItem will apply based on its `width` prop.\n\nFor example: `{ '1/2': 'w-1/2', '1/3': 'w-1/3', fallback: 'w-full' }`\n\nNotice the special `fallback` key that will be apply if no `default` value is given ",
        },
        {
          name: 'gaps',
          type: { summary: 'object' },
          description:
            'List of available gaps.\n\nFor example: `{ "1": { "containerClass": "-mt-1", "itemClass": "mt-1" } }`',
        },
      ],
    },
  },
};

export const GridResponsive = () => ({
  components: { CFlex, CFlexItem },
  template: `<CFlex gap="2">
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
  </CFlex>`,
});

export const DifferentGapByAxis = () => ({
  components: { CFlex, CFlexItem },
  template: `<CFlex :gap="[3, 6]">
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
  </CFlex>`,
});

export const Inline = () => ({
  components: { CFlex, CFlexItem },
  template: `<CFlex gap="2">
    <CFlexItem><div class="bg-gray-200 p-2">Alice Blue</div></CFlexItem>
    <CFlexItem><div class="bg-gray-200 p-2">Antique White</div></CFlexItem>
    <CFlexItem><div class="bg-gray-200 p-2">Aqua</div></CFlexItem>
    <CFlexItem><div class="bg-gray-200 p-2">Aquamarine</div></CFlexItem>
    <CFlexItem><div class="bg-gray-200 p-2">Azure</div></CFlexItem>
    <CFlexItem><div class="bg-gray-200 p-2">Beige</div></CFlexItem>
    <CFlexItem><div class="bg-gray-200 p-2">Bisque</div></CFlexItem>
    <CFlexItem><div class="bg-gray-200 p-2">Black</div></CFlexItem>
    <CFlexItem><div class="bg-gray-200 p-2">Blanched Almond</div></CFlexItem>
    <CFlexItem><div class="bg-gray-200 p-2">Blue</div></CFlexItem>
    <CFlexItem><div class="bg-gray-200 p-2">Blue Violet</div></CFlexItem>
    <CFlexItem><div class="bg-gray-200 p-2">Brown</div></CFlexItem>
    <CFlexItem><div class="bg-gray-200 p-2">Burly Wood</div></CFlexItem>
    <CFlexItem><div class="bg-gray-200 p-2">Cadet Blue</div></CFlexItem>
    <CFlexItem><div class="bg-gray-200 p-2">Chartreuse</div></CFlexItem>
    <CFlexItem><div class="bg-gray-200 p-2">Chocolate</div></CFlexItem>
    <CFlexItem><div class="bg-gray-200 p-2">Coral</div></CFlexItem>
    <CFlexItem><div class="bg-gray-200 p-2">Cornflower Blue</div></CFlexItem>
    <CFlexItem><div class="bg-gray-200 p-2">Cornsilk</div></CFlexItem>
    <CFlexItem><div class="bg-gray-200 p-2">Crimson</div></CFlexItem>
    <CFlexItem><div class="bg-gray-200 p-2">Cyan</div></CFlexItem>
    <CFlexItem><div class="bg-gray-200 p-2">Dark Blue</div></CFlexItem>
    <CFlexItem><div class="bg-gray-200 p-2">Dark Cyan</div></CFlexItem>
    <CFlexItem><div class="bg-gray-200 p-2">Dark GoldenRod</div></CFlexItem>
    <CFlexItem><div class="bg-gray-200 p-2">Dark Gray</div></CFlexItem>
    <CFlexItem><div class="bg-gray-200 p-2">Dark Green</div></CFlexItem>
  </CFlex>`,
});

export const Stack = () => ({
  components: { CFlex, CFlexItem },
  template: `<CFlex gap="3" class="flex-col">
    <CFlexItem width="full">
      <div class="p-2 bg-gray-200">
        1
      </div>
    </CFlexItem>
    <CFlexItem width="full">
      <div class="p-2 bg-gray-200">
        2
      </div>
    </CFlexItem>
    <CFlexItem width="full">
      <div class="p-2 bg-gray-200">
        3
      </div>
    </CFlexItem>
  </CFlex>`,
});
